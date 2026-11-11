// =====================================================
//  لوحة التحكم بتاعة طِيب
//  بتقرا المنتجات والإعدادات من GitHub. ولما تدوس "نشر على الموقع"
//  بتحفظ كل التعديلات هناك مرة واحدة، وCloudflare بيحدّث الموقع لوحده.
//  مفيش أي كلمة سر جوه الملف ده: رمز الدخول بيتحفظ على جهازك بس.
// =====================================================

// مكان ملفات الموقع على GitHub
const REPO = { owner: "mohamedeliwa206-coder", name: "website", branch: "main" };
const API = "https://api.github.com";
const TOKEN_KEY = "teeb-admin-token";

// الصور اللي بتترفع من اللوحة بتتحط في الفولدر ده
const IMAGE_FOLDER = "images/products/";
// أقصى مقاس للصورة بعد التصغير (بالبكسل)
const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1250;

// خانات كل منتج بالترتيب اللي بتتكتب بيه في products.js
const PRODUCT_FIELDS = [
  ["name", "text"], ["nameEn", "text"],
  ["description", "text"], ["descriptionEn", "text"],
  ["size", "text"], ["sizeEn", "text"],
  ["price", "number"], ["oldPrice", "number"],
  ["offer", "bool"], ["available", "bool"],
  ["image", "text"]
];

// خانات الإعدادات وشرح كل واحدة (بيتكتب كتعليق في settings.js)
const SETTING_FIELDS = [
  ["whatsapp", "رقم الواتساب: 20 وبعدها رقمك من غير الصفر اللي في الأول (مثال: 201012345678)"],
  ["deliveryTime", "مدة التسليم اللي بتلتزم بيها"],
  ["deliveryTimeEn", null],
  ["offerBar", "نص شريط العروض اللي فوق العنوان. لو عايز تخفيه خالص اكتب \"\" بس"],
  ["offerBarEn", null],
  ["instagram", "لينكات السوشيال (\"#\" يعني لسه مفيش لينك)"],
  ["facebook", null]
];

// كل اللي اللوحة شايلاه دلوقتي
const state = {
  token: "",
  headSha: "",          // آخر نسخة من الموقع على GitHub
  productsSha: null,    // نسخة products.js اللي اتحملت
  settingsSha: null,    // نسخة settings.js اللي اتحملت
  products: [],         // المنتجات بعد تعديلاتك
  settings: {},         // الإعدادات بعد تعديلاتك
  saved: { products: "[]", settings: "{}", images: [] }, // آخر حاجة اتنشرت
  newImages: {},        // صور جديدة لسه متنشرتش: المسار ← الصورة
  previews: {},         // روابط مؤقتة علشان نعرض الصور الجديدة
  busy: false
};

const $ = function (id) { return document.getElementById(id); };


// ===== أدوات صغيرة =====

// بيحوّل الأرقام العربي (١٢٣) لإنجليزي (123)
function latinDigits(text) {
  return String(text == null ? "" : text)
    .replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; })
    .replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; });
}

// بيقرا رقم من خانة (بيقبل 1,850 أو ١٨٥٠). لو فاضي بيرجع 0، ولو غلط بيرجع NaN
function readNumber(text) {
  const clean = latinDigits(text).replace(/[,\s٬،]/g, "");
  if (clean === "") return 0;
  return /^\d+(\.\d+)?$/.test(clean) ? Number(clean) : NaN;
}

// رقم الواتساب بالشكل اللي الواتساب محتاجه: 01012345678 ← 201012345678
function normalizeWhatsapp(text) {
  let digits = latinDigits(text).replace(/\D/g, "");
  if (digits.indexOf("00") === 0) digits = digits.slice(2);
  if (digits.length === 11 && digits[0] === "0") digits = "20" + digits.slice(1);
  if (digits.length === 10 && digits[0] === "1") digits = "20" + digits;
  return digits;
}

// اللينك لازم يبدأ بـ https://
function normalizeLink(text) {
  const value = String(text || "").trim();
  if (!value || value === "#") return "";
  return /^https?:\/\//i.test(value) ? value : "https://" + value;
}

function formatPrice(n) {
  return Number(n).toLocaleString("en-US") + " جنيه";
}

// اسم ملف آمن للصورة من اسم المنتج الإنجليزي
function slugify(text) {
  const slug = String(text || "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  return slug || "perfume";
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null && text !== "") node.textContent = text;
  return node;
}

const BOTTLE = '<svg viewBox="0 0 80 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" aria-hidden="true"><rect x="30" y="6" width="20" height="14" rx="3"/><path d="M35 20v10M45 20v10"/><rect x="12" y="30" width="56" height="84" rx="14"/></svg>';

function placeholder(className) {
  const box = el("div", className + " is-empty");
  box.innerHTML = BOTTLE;
  return box;
}


// ===== تنظيف البيانات =====

function cleanProduct(p) {
  const out = {};
  PRODUCT_FIELDS.forEach(function (f) {
    const name = f[0], type = f[1], value = p ? p[name] : undefined;
    if (type === "number") out[name] = Number(value) > 0 ? Number(value) : 0;
    else if (type === "bool") out[name] = value === true;
    else out[name] = value == null ? "" : String(value).trim();
  });
  return out;
}

function cleanSettings(s) {
  const out = {};
  SETTING_FIELDS.forEach(function (f) {
    const value = s && s[f[0]] != null ? String(s[f[0]]).trim() : "";
    out[f[0]] = value === "#" ? "" : value;
  });
  return out;
}


// ===== كتابة الملفات بنفس شكلها اللي في الموقع =====

const PRODUCTS_HEADER = [
  "// =====================================================",
  "//  لستة المنتجات",
  "//  الأسهل تضيف وتعدّل المنتجات من لوحة التحكم: (لينك موقعك)/admin",
  "//  الملف ده بيتكتب لوحده من هناك.",
  "//",
  "//  لو هتعدّله بإيدك، القواعد:",
  "//  - كل منتج بيبدأ بـ {  وبيخلص بـ  },  (الفاصلة دي لازم حتى بعد آخر منتج)",
  "//  - ترتيب المنتجات هنا هو نفس ترتيبها في الموقع",
  "//  - الكلام لازم يبقى بين علامتين تنصيص \"كده\"",
  "//  - الأرقام (السعر) من غير تنصيص ومن غير كلمة جنيه",
  "//  - oldPrice: السعر قبل الخصم، ولو مفيش خصم اكتب 0",
  "//  - offer: true = يظهر في قسم \"العروض\" | false = يظهر في قسم \"المنتجات\"",
  "//  - available: true = متاح للحجز | false = نفد",
  "//  - image: مسار الصورة زي \"images/perfume1.jpg\"، ولو فاضي \"\" هيظهر شكل مؤقت",
  "//  - الحاجات اللي آخرها En دي النسخة الإنجليزي، ولو فاضية هيظهر العربي مكانها",
  "// ====================================================="
];

function productsFile(products) {
  const lines = PRODUCTS_HEADER.concat(["", "const PRODUCTS = ["]);
  products.forEach(function (p) {
    lines.push("  {");
    PRODUCT_FIELDS.forEach(function (f, i) {
      const name = f[0], type = f[1];
      let value;
      if (type === "number") value = String(Number(p[name]) || 0);
      else if (type === "bool") value = p[name] ? "true" : "false";
      else value = JSON.stringify(String(p[name] || ""));
      lines.push("    " + name + ": " + value + (i < PRODUCT_FIELDS.length - 1 ? "," : ""));
    });
    lines.push("  },");
  });
  lines.push("];");
  return lines.join("\n") + "\n";
}

function settingsFile(settings) {
  const lines = [
    "// =====================================================",
    "//  إعدادات المتجر",
    "//  الأسهل تعدّلها من لوحة التحكم: (لينك موقعك)/admin",
    "//  ولو هتعدّلها بإيدك: غيّر الكلام اللي بين علامتين التنصيص \"كده\" بس.",
    "//  الحاجات اللي آخرها En دي النسخة الإنجليزي من نفس الحاجة.",
    "// =====================================================",
    "",
    "const SETTINGS = {"
  ];
  SETTING_FIELDS.forEach(function (f, i) {
    const name = f[0], comment = f[1];
    let value = settings[name] || "";
    if ((name === "instagram" || name === "facebook") && !value) value = "#";
    if (comment) {
      if (i > 0) lines.push("");
      lines.push("  // " + comment);
    }
    lines.push("  " + name + ": " + JSON.stringify(value) + (i < SETTING_FIELDS.length - 1 ? "," : ""));
  });
  lines.push("};");
  return lines.join("\n") + "\n";
}

// بيشغّل ملف (products.js أو settings.js) ويطلّع منه المتغير اللي جواه
function readJsFile(text, name) {
  // eslint-disable-next-line no-new-func
  return new Function(text + "\n;return typeof " + name + " === 'undefined' ? undefined : " + name + ";")();
}


// ===== الكلام مع GitHub =====

function repoPath(path) {
  return "/repos/" + REPO.owner + "/" + REPO.name + path;
}

async function gh(path, options) {
  options = options || {};
  const headers = {
    "Accept": "application/vnd.github+json",
    "Authorization": "Bearer " + state.token,
    "X-GitHub-Api-Version": "2022-11-28"
  };
  if (options.body) headers["Content-Type"] = "application/json";
  const response = await fetch(API + path, {
    method: options.method || "GET",
    headers: headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });
  let data = null;
  try { data = await response.json(); } catch (e) {}
  if (!response.ok) {
    const error = new Error((data && data.message) || ("HTTP " + response.status));
    error.status = response.status;
    throw error;
  }
  return data;
}

function decodeBase64(b64) {
  const binary = atob(String(b64).replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}

async function readBlob(sha) {
  const blob = await gh(repoPath("/git/blobs/" + sha));
  return decodeBase64(blob.content);
}

// آخر نسخة من الموقع: رقمها ولستة كل الملفات اللي فيها
async function getHead() {
  const ref = await gh(repoPath("/git/ref/heads/" + REPO.branch));
  const commit = await gh(repoPath("/git/commits/" + ref.object.sha));
  const tree = await gh(repoPath("/git/trees/" + commit.tree.sha + "?recursive=1"));
  const files = {};
  (tree.tree || []).forEach(function (entry) {
    if (entry.type === "blob") files[entry.path] = entry;
  });
  return { commitSha: ref.object.sha, treeSha: commit.tree.sha, files: files };
}

// رسالة مفهومة بدل رسايل GitHub الإنجليزي
function friendlyError(error) {
  if (error && error.friendly) return error.friendly;
  const status = error && error.status;
  if (status === 401) return "رمز الدخول غلط أو انتهت صلاحيته. اعمل رمز جديد وادخل بيه.";
  if (status === 403 && /rate limit/i.test(error.message)) return "GitHub طالب نستنى شوية. جرّب تاني بعد دقايق.";
  if (status === 403) return "رمز الدخول ده مش معاه صلاحية التعديل. لما تعمل الرمز، اختار Contents وخليها Read and write.";
  if (status === 404) return "مش لاقي مستودع website. اتأكد إنك اخترته في Repository access وانت بتعمل الرمز.";
  if (status === 409 || status === 422) return "حصل تعارض مع تعديل تاني اتعمل في نفس الوقت. دوس نشر تاني.";
  if (error instanceof TypeError) return "مفيش اتصال بالإنترنت، أو GitHub مش بيرد. اتأكد من النت وجرّب تاني.";
  return "حصلت مشكلة: " + (error && error.message ? error.message : "مش معروفة") + ". جرّب تاني.";
}


// ===== تحميل البيانات =====

async function loadData() {
  const head = await getHead();
  let products = [];
  let settings = {};

  const productsEntry = head.files["products.js"];
  if (productsEntry) {
    const text = await readBlob(productsEntry.sha);
    let list;
    try { list = readJsFile(text, "PRODUCTS"); } catch (e) { list = undefined; }
    if (!Array.isArray(list)) {
      const err = new Error("products.js");
      err.friendly = "ملف products.js فيه غلطة كتابة، فاللوحة مش قادرة تقراه. صلّح الغلطة الأول (أو رجّع آخر تعديل) وبعدين افتح اللوحة تاني.";
      throw err;
    }
    products = list;
  }

  const settingsEntry = head.files["settings.js"];
  if (settingsEntry) {
    const text = await readBlob(settingsEntry.sha);
    try { settings = readJsFile(text, "SETTINGS") || {}; } catch (e) {
      const err = new Error("settings.js");
      err.friendly = "ملف settings.js فيه غلطة كتابة، فاللوحة مش قادرة تقراه. صلّح الغلطة الأول وبعدين افتح اللوحة تاني.";
      throw err;
    }
  }

  state.headSha = head.commitSha;
  state.productsSha = productsEntry ? productsEntry.sha : null;
  state.settingsSha = settingsEntry ? settingsEntry.sha : null;
  state.products = products.map(cleanProduct);
  state.settings = cleanSettings(settings);
  state.newImages = {};
  markSaved();
}

// بنفتكر آخر حاجة اتنشرت علشان نعرف لو فيه تعديلات جديدة
function markSaved() {
  state.saved = {
    products: JSON.stringify(state.products),
    settings: JSON.stringify(state.settings),
    images: state.products.map(function (p) { return p.image; }).filter(Boolean)
  };
}

function productsChanged() { return JSON.stringify(state.products) !== state.saved.products; }
function settingsChanged() { return JSON.stringify(state.settings) !== state.saved.settings; }
function hasChanges() { return productsChanged() || settingsChanged(); }


// ===== النشر =====

function blobToBase64(blob) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () { resolve(String(reader.result).split(",")[1]); };
    reader.onerror = function () { reject(reader.error); };
    reader.readAsDataURL(blob);
  });
}

async function publish() {
  if (state.busy || !hasChanges()) return;
  const problem = settingsProblem();
  if (problem) {
    showTab("settings");
    setStatus(problem, "error");
    return;
  }

  setBusy(true);
  setStatus("بننشر التعديلات... متقفلش الصفحة.", "busy");

  try {
    await publishOnce().catch(async function (error) {
      // لو حد نشر في نفس اللحظة، بنحاول مرة كمان
      if (error.status === 409 || error.status === 422) return publishOnce();
      throw error;
    });
    setStatus("اتنشر ✓ الموقع هيتحدث خلال دقيقة أو اتنين.", "ok");
  } catch (error) {
    setStatus(friendlyError(error), "error");
  }
  setBusy(false);
  renderAll();
}

async function publishOnce() {
  const head = await getHead();

  // لو المنتجات أو الإعدادات اتغيرت من مكان تاني بعد ما فتحت اللوحة، منكتبش فوقها
  const remoteProducts = head.files["products.js"] ? head.files["products.js"].sha : null;
  const remoteSettings = head.files["settings.js"] ? head.files["settings.js"].sha : null;
  if (remoteProducts !== state.productsSha || remoteSettings !== state.settingsSha) {
    const err = new Error("conflict");
    err.friendly = "المنتجات أو الإعدادات اتعدلت من مكان تاني (جهاز تاني أو VS Code) بعد ما فتحت اللوحة. اعمل تحديث للصفحة (F5) علشان تجيب آخر نسخة، وبعدين اعمل تعديلاتك تاني.";
    throw err;
  }

  const used = {};
  state.products.forEach(function (p) { if (p.image) used[p.image] = true; });
  const changes = [];

  // 1) الصور الجديدة
  for (const path of Object.keys(state.newImages)) {
    if (!used[path]) continue;
    const content = await blobToBase64(state.newImages[path]);
    const blob = await gh(repoPath("/git/blobs"), { method: "POST", body: { content: content, encoding: "base64" } });
    changes.push({ path: path, mode: "100644", type: "blob", sha: blob.sha });
  }

  // 2) صور المنتجات اللي اتمسحت أو اتغيرت (من فولدر اللوحة بس)
  const removed = {};
  state.saved.images.forEach(function (path) {
    if (path.indexOf(IMAGE_FOLDER) === 0 && !used[path] && head.files[path] && !removed[path]) {
      removed[path] = true;
      changes.push({ path: path, mode: "100644", type: "blob", sha: null });
    }
  });

  // 3) ملفات المنتجات والإعدادات
  if (productsChanged() || !head.files["products.js"]) {
    changes.push({ path: "products.js", mode: "100644", type: "blob", content: productsFile(state.products) });
  }
  if (settingsChanged() || !head.files["settings.js"]) {
    changes.push({ path: "settings.js", mode: "100644", type: "blob", content: settingsFile(state.settings) });
  }

  // كل التعديلات في نسخة (commit) واحدة، علشان الموقع يتحدث مرة واحدة
  const tree = await gh(repoPath("/git/trees"), { method: "POST", body: { base_tree: head.treeSha, tree: changes } });
  const commit = await gh(repoPath("/git/commits"), {
    method: "POST",
    body: { message: "تحديث من لوحة التحكم", tree: tree.sha, parents: [head.commitSha] }
  });
  await gh(repoPath("/git/refs/heads/" + REPO.branch), { method: "PATCH", body: { sha: commit.sha, force: false } });

  // نفتكر النسخة الجديدة
  const top = {};
  (tree.tree || []).forEach(function (entry) { top[entry.path] = entry.sha; });
  state.headSha = commit.sha;
  state.productsSha = top["products.js"] || null;
  state.settingsSha = top["settings.js"] || null;
  state.newImages = {};
  markSaved();
}


// ===== الصور =====

// بتصغّر الصورة لحد 1000 بكسل عرض وبتحولها JPG خفيف
function compressImage(file) {
  return new Promise(function (resolve, reject) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = function () {
      const scale = Math.min(1, MAX_WIDTH / img.naturalWidth, MAX_HEIGHT / img.naturalHeight);
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);

      // بنقلل الجودة شوية لو الصورة لسه تقيلة
      const qualities = [0.82, 0.72, 0.62];
      (function attempt(i) {
        canvas.toBlob(function (blob) {
          if (!blob) return reject(new Error("encode"));
          if (blob.size > 350 * 1024 && i < qualities.length - 1) return attempt(i + 1);
          resolve(blob);
        }, "image/jpeg", qualities[i]);
      })(0);
    };
    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error("decode"));
    };
    img.src = url;
  });
}

// لينك الصورة علشان نعرضها في اللوحة
function imageSource(path) {
  if (state.previews[path]) return state.previews[path];
  return "https://raw.githubusercontent.com/" + REPO.owner + "/" + REPO.name + "/" + state.headSha + "/" +
    path.split("/").map(encodeURIComponent).join("/");
}

function makeImage(path, className) {
  if (!path) return placeholder(className);
  const img = el("img", className);
  img.alt = "";
  img.loading = "lazy";
  img.src = imageSource(path);
  img.onerror = function () {
    // لو مش لاقيها على GitHub، نجرب من الموقع نفسه، ولو مفيش نحط الشكل المؤقت
    if (!img.dataset.retry) {
      img.dataset.retry = "1";
      img.src = "../" + path;
    } else {
      img.replaceWith(placeholder(className));
    }
  };
  return img;
}


// ===== عرض المنتجات =====

function renderProducts() {
  const list = $("product-list");
  list.innerHTML = "";
  $("count").textContent = state.products.length ? "(" + state.products.length + ")" : "";
  $("empty").hidden = state.products.length > 0;

  state.products.forEach(function (p, i) {
    const item = el("li", "item" + (p.available ? "" : " is-soldout"));
    item.dataset.index = i;

    item.appendChild(makeImage(p.image, "thumb"));

    const info = el("div", "info");
    info.appendChild(el("strong", "item-name", p.name || "(من غير اسم)"));
    if (p.size) info.appendChild(el("span", "item-size", p.size));
    const prices = el("div", "item-prices");
    if (p.price > 0) prices.appendChild(el("span", "item-price", formatPrice(p.price)));
    else prices.appendChild(el("span", "item-noprice", "من غير سعر (هيظهر «السعر قريبًا»)"));
    if (p.price > 0 && p.oldPrice > p.price) prices.appendChild(el("del", "item-old", formatPrice(p.oldPrice)));
    info.appendChild(prices);
    item.appendChild(info);

    const toggles = el("div", "toggles");
    const avail = el("button", "chip " + (p.available ? "chip-ok" : "chip-off"), p.available ? "متاح للحجز" : "نفد");
    avail.type = "button";
    avail.dataset.action = "available";
    avail.title = "دوس علشان تغيّر الحالة";
    const offer = el("button", "chip " + (p.offer ? "chip-gold" : "chip-muted"), p.offer ? "في قسم العروض" : "في قسم المنتجات");
    offer.type = "button";
    offer.dataset.action = "offer";
    offer.title = "دوس علشان تنقله بين قسم العروض وقسم المنتجات";
    toggles.append(avail, offer);
    item.appendChild(toggles);

    const actions = el("div", "actions");
    [
      ["up", "↑", "طلّعه لفوق", i === 0],
      ["down", "↓", "نزّله لتحت", i === state.products.length - 1],
      ["edit", "تعديل", "", false],
      ["delete", "حذف", "", false]
    ].forEach(function (a) {
      const b = el("button", "act act-" + a[0], a[1]);
      b.type = "button";
      b.dataset.action = a[0];
      if (a[2]) b.setAttribute("aria-label", a[2] + ": " + (p.name || ""));
      b.disabled = a[3];
      actions.appendChild(b);
    });
    item.appendChild(actions);

    list.appendChild(item);
  });
}

$("product-list").addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (!button || state.busy) return;
  const index = Number(button.closest(".item").dataset.index);
  const p = state.products[index];
  const action = button.dataset.action;

  if (action === "available") p.available = !p.available;
  else if (action === "offer") p.offer = !p.offer;
  else if (action === "up" && index > 0) {
    state.products.splice(index - 1, 0, state.products.splice(index, 1)[0]);
  } else if (action === "down" && index < state.products.length - 1) {
    state.products.splice(index + 1, 0, state.products.splice(index, 1)[0]);
  } else if (action === "edit") return openEditor(index);
  else if (action === "delete") {
    if (!confirm("متأكد إنك عايز تمسح \"" + (p.name || "المنتج ده") + "\"؟\n(مش هيتمسح من الموقع غير لما تدوس نشر)")) return;
    state.products.splice(index, 1);
  }
  afterEdit();
});


// ===== نافذة إضافة / تعديل منتج =====

const editor = $("editor");
const form = $("editor-form");
let editing = { index: -1, image: "", newImage: null, preview: "" };

function openEditor(index) {
  const isNew = index < 0;
  const p = isNew ? cleanProduct({
    description: "عطر من عبدالصمد القرشي",
    descriptionEn: "Abdul Samad Al Qurashi perfume",
    available: true
  }) : state.products[index];

  editing = { index: index, image: p.image, newImage: null, preview: "" };
  $("editor-title").textContent = isNew ? "إضافة منتج جديد" : "تعديل المنتج";

  PRODUCT_FIELDS.forEach(function (f) {
    const input = form.elements[f[0]];
    if (!input) return;
    if (f[1] === "bool") input.checked = p[f[0]];
    else if (f[1] === "number") input.value = p[f[0]] ? p[f[0]] : "";
    else input.value = p[f[0]];
  });

  showEditorMessage("");
  $("image-input").value = "";
  renderEditorImage();
  editor.showModal();
}

function renderEditorImage() {
  const box = $("image-preview");
  box.innerHTML = "";
  if (editing.preview) {
    const img = el("img", "preview-img");
    img.alt = "";
    img.src = editing.preview;
    box.appendChild(img);
  } else {
    box.appendChild(makeImage(editing.image, "preview-img"));
  }
  $("image-remove").hidden = !editing.image && !editing.preview;
}

function showEditorMessage(text) {
  const box = $("editor-error");
  box.textContent = text;
  box.hidden = !text;
}

async function handleImageFile(file) {
  if (!file) return;
  if (!/^image\//.test(file.type) && !/\.(jpe?g|png|webp|heic|heif|gif)$/i.test(file.name)) {
    showEditorMessage("الملف ده مش صورة. اختار صورة JPG أو PNG.");
    return;
  }
  $("image-hint").textContent = "بنصغّر الصورة...";
  try {
    const blob = await compressImage(file);
    if (editing.preview) URL.revokeObjectURL(editing.preview);
    editing.newImage = blob;
    editing.preview = URL.createObjectURL(blob);
    showEditorMessage("");
    $("image-hint").textContent = "تمام، حجم الصورة بقى " + Math.round(blob.size / 1024) + " كيلو.";
  } catch (e) {
    showEditorMessage("مش قادر أفتح الصورة دي. جرّب صورة تانية بصيغة JPG أو PNG.");
    $("image-hint").textContent = "";
  }
  renderEditorImage();
}

$("image-input").addEventListener("change", function () {
  handleImageFile(this.files && this.files[0]);
});

$("image-remove").addEventListener("click", function () {
  editing.image = "";
  editing.newImage = null;
  editing.preview = "";
  $("image-input").value = "";
  $("image-hint").textContent = "الصورة هتتشال، والكارت هيظهر بالشكل المؤقت.";
  renderEditorImage();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const values = {};
  PRODUCT_FIELDS.forEach(function (f) {
    const input = form.elements[f[0]];
    if (!input) return;
    values[f[0]] = f[1] === "bool" ? input.checked : input.value;
  });

  const name = values.name.trim();
  const price = readNumber(values.price);
  const oldPrice = readNumber(values.oldPrice);

  if (!name) return showEditorMessage("اكتب اسم العطر.");
  if (isNaN(price)) return showEditorMessage("اكتب السعر بالأرقام بس، زي 1850. أو سيبه فاضي لو لسه مش عارفه.");
  if (isNaN(oldPrice)) return showEditorMessage("السعر قبل الخصم لازم يبقى أرقام بس، أو سيبه فاضي.");
  if (oldPrice > 0 && price > 0 && oldPrice <= price) {
    return showEditorMessage("السعر قبل الخصم لازم يبقى أكبر من السعر الحالي، أو سيبه فاضي لو مفيش خصم.");
  }

  values.name = name;
  values.price = price;
  values.oldPrice = oldPrice;
  values.image = editing.image;

  // لو فيه صورة جديدة بنديها اسم بالإنجليزي من غير مسافات
  if (editing.newImage) {
    const path = IMAGE_FOLDER + slugify(values.nameEn) + "-" + Date.now().toString(36) + ".jpg";
    state.newImages[path] = editing.newImage;
    state.previews[path] = editing.preview;
    values.image = path;
  }

  const product = cleanProduct(values);
  if (editing.index < 0) state.products.push(product);
  else state.products[editing.index] = product;

  editor.close();
  afterEdit();
  if (editing.index < 0) {
    const last = $("product-list").lastElementChild;
    if (last) last.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

editor.addEventListener("click", function (event) {
  if (event.target.closest("[data-close]")) editor.close();
});

$("add-product").addEventListener("click", function () { if (!state.busy) openEditor(-1); });


// ===== الإعدادات =====

const settingsForm = $("settings-form");

function renderSettings() {
  SETTING_FIELDS.forEach(function (f) {
    const input = settingsForm.elements[f[0]];
    if (input && document.activeElement !== input) input.value = state.settings[f[0]] || "";
  });
}

function settingValue(name, raw) {
  if (name === "whatsapp") return normalizeWhatsapp(raw);
  if (name === "instagram" || name === "facebook") return normalizeLink(raw);
  return String(raw).trim();
}

settingsForm.addEventListener("input", function (event) {
  const name = event.target.name;
  if (!name) return;
  state.settings[name] = settingValue(name, event.target.value);
  if ($("publish-status").dataset.kind === "error") setStatus("", "");
  updatePublishBar();
});

// لما تخرج من الخانة بنكتب القيمة بالشكل النهائي (زي رقم الواتساب بالـ 20)
settingsForm.addEventListener("change", function (event) {
  const name = event.target.name;
  if (!name) return;
  event.target.value = state.settings[name] || "";
  $("wa-test").href = "https://wa.me/" + (state.settings.whatsapp || "");
});

settingsForm.addEventListener("submit", function (event) { event.preventDefault(); });

function settingsProblem() {
  const wa = state.settings.whatsapp || "";
  if (!/^\d{10,15}$/.test(wa)) return "رقم الواتساب مش مظبوط. اكتبه زي 01012345678.";
  return "";
}


// ===== التابات وشريط النشر =====

function showTab(name) {
  ["products", "settings"].forEach(function (tab) {
    const active = tab === name;
    $("tab-" + tab).setAttribute("aria-selected", active ? "true" : "false");
    $("panel-" + tab).hidden = !active;
  });
}

$("tab-products").addEventListener("click", function () { showTab("products"); });
$("tab-settings").addEventListener("click", function () { showTab("settings"); });

function setStatus(text, kind) {
  const box = $("publish-status");
  box.textContent = text;
  box.dataset.kind = kind || "";
}

function setBusy(busy) {
  state.busy = busy;
  document.body.classList.toggle("is-busy", busy);
  updatePublishBar();
}

function updatePublishBar() {
  const dirty = hasChanges();
  $("publish").disabled = !dirty || state.busy;
  $("discard").hidden = !dirty || state.busy;
  const kind = $("publish-status").dataset.kind;
  if (state.busy) return;
  if (dirty && kind !== "error") setStatus("عندك تعديلات لسه متنشرتش على الموقع.", "dirty");
  if (!dirty && (kind === "dirty" || !kind)) setStatus("كل حاجة منشورة على الموقع.", "");
}

function renderAll() {
  renderProducts();
  renderSettings();
  updatePublishBar();
}

// بعد أي تعديل: نشيل رسالة الغلط القديمة ونرسم من جديد
function afterEdit() {
  if ($("publish-status").dataset.kind === "error") setStatus("", "");
  renderAll();
}

$("publish").addEventListener("click", publish);

$("discard").addEventListener("click", function () {
  if (!confirm("هتلغي كل التعديلات اللي لسه متنشرتش. متأكد؟")) return;
  state.products = JSON.parse(state.saved.products);
  state.settings = JSON.parse(state.saved.settings);
  state.newImages = {};
  setStatus("", "");
  renderAll();
});

// تحذير لو قفلت الصفحة وفيه تعديلات متنشرتش
window.addEventListener("beforeunload", function (event) {
  if (hasChanges() || state.busy) {
    event.preventDefault();
    event.returnValue = "";
  }
});


// ===== الدخول والخروج =====

function readToken() {
  try { return localStorage.getItem(TOKEN_KEY) || ""; } catch (e) { return ""; }
}

function writeToken(value) {
  try {
    if (value) localStorage.setItem(TOKEN_KEY, value);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (e) {}
}

function showScreen(name) {
  $("login").hidden = name !== "login";
  $("loading").hidden = name !== "loading";
  $("load-error").hidden = name !== "error";
  $("app").hidden = name !== "app";
  $("publish-bar").hidden = name !== "app";
  $("logout").hidden = name === "login";
}

async function start(token) {
  state.token = token;
  showScreen("loading");
  try {
    await loadData();
    writeToken(token);
    showScreen("app");
    showTab("products");
    setStatus("", "");
    renderAll();
    $("wa-test").href = "https://wa.me/" + (state.settings.whatsapp || "");
  } catch (error) {
    const message = friendlyError(error);
    const badToken = error.status === 401 || error.status === 404 ||
      (error.status === 403 && !/rate limit/i.test(error.message));
    if (badToken) {
      writeToken("");
      showScreen("login");
      showLoginError(message);
    } else {
      $("load-error-text").textContent = message;
      showScreen("error");
    }
  }
}

function showLoginError(text) {
  $("login-error").textContent = text;
  $("login-error").hidden = !text;
}

$("login-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const token = $("token").value.trim();
  if (!token) return showLoginError("حط رمز الدخول الأول.");
  showLoginError("");
  $("token").value = "";
  start(token);
});

$("logout").addEventListener("click", function () {
  if (hasChanges() && !confirm("عندك تعديلات لسه متنشرتش، هتضيع لو خرجت. متأكد؟")) return;
  writeToken("");
  state.products = [];
  state.settings = {};
  markSaved();
  location.reload();
});

$("retry").addEventListener("click", function () { start(state.token); });


// ===== أول ما الصفحة تفتح =====
(function init() {
  const token = readToken();
  if (token) start(token);
  else showScreen("login");
})();
