// =====================================================
//  كود الموقع، مش محتاج تلمسه.
//  إعدادات المتجر (رقم الواتساب، مدة التسليم، شريط العروض، السوشيال)
//  بقت في ملف settings.js، وتقدر تعدّلها من لوحة التحكم (لينك موقعك)/admin
// =====================================================

const root = document.documentElement;

// الإعدادات من settings.js. لو الملف فيه غلطة، الموقع يفضل شغال بقيم فاضية
const CONFIG = typeof SETTINGS !== "undefined" ? SETTINGS : {};

// الكلام اللي الكود بيكتبه بنفسه، بالعربي والإنجليزي
const TEXT = {
  ar: {
    title: "طِيب | عطور أصلية من الخليج بسعر أقل من السوق",
    order: "اطلب على واتساب",
    notify: "بلّغني لما يتوفر",
    available: "متاح للحجز",
    soldout: "نفد",
    offer: "عرض الافتتاح",
    oldPrice: "السعر قبل الخصم",
    price: function (n) { return n + " جنيه"; },
    waGeneral: "السلام عليكم، عندي سؤال عن العطور",
    waOrder: function (item, price) { return "السلام عليكم، ممكن أحجز:\n" + item + "\nالسعر: " + price; },
    waNotify: function (item) { return "السلام عليكم، ممكن تبلّغني لما يتوفر " + item + "؟"; },
    priceSoon: "السعر قريبًا",
    waAsk: function (item) { return "السلام عليكم، ممكن أعرف سعر:\n" + item; },
    fileError: "فيه غلطة في ملف products.js، غالبًا فاصلة أو علامة تنصيص ناقصة. راجع آخر تعديل عملته.",
    empty: "مفيش عطور متاحة دلوقتي، تابعنا علشان تعرف العروض الجاية.",
    searchPlaceholder: "ابحث عن عطر… مثلًا: مسك أو سفاري",
    searchLabel: "ابحث في المنتجات",
    searchCount: function (n) { return "عدد النتايج: " + n; },
    searchNone: function (q) { return "مفيش منتجات فيها «" + q + "». "; },
    searchAsk: "ابعتلنا اسم العطر على واتساب ونشوفهولك",
    waSearch: function (q) { return "السلام عليكم، بدوّر على عطر: " + q; },
    reviewAlt: "رسالة من عميل",
    allCats: "الكل",
    zoom: "كبّر الصورة",
    share: "شارك لينك المنتج",
    copied: "اتنسخ لينك المنتج ✓",
    addToCart: "أضف للسلة",
    inCart: "في السلة ✓",
    added: "اتضاف للسلة ✓",
    cartTitle: "سلة الطلبات",
    cartLabel: "السلة",
    cartCta: "اطلب الكل",
    cartPriceLater: "السعر هيتأكد",
    cartTotal: "الإجمالي",
    cartDeposit: "العربون 50%",
    cartRest: "الباقي عند الاستلام",
    cartUnpriced: "فيه منتجات لسه سعرها هيتأكد على واتساب، ومش محسوبة في الإجمالي.",
    cartSend: "ابعت الطلب على واتساب",
    cartClear: "فضّي السلة",
    cartIntro: "السلام عليكم، عايز أحجز الطلب ده:",
    cartAsk: "السعر؟",
    cartAskAll: "ممكن تقولّي سعر المنتجات اللي جنبها «السعر؟»",
    cartMore: "زوّد واحد",
    cartLess: "قلّل واحد",
    cartRemove: "شيل من السلة",
    cartConfirmClear: "هتفضّي السلة كلها. متأكد؟",
    langButton: "EN",
    langLabel: "Switch to English",
    toDark: "الوضع الليلي",
    toLight: "الوضع العادي"
  },
  en: {
    title: "Teeb | Original perfumes from the Gulf below market price",
    order: "Order on WhatsApp",
    notify: "Notify me",
    available: "Pre-order open",
    soldout: "Sold out",
    offer: "Opening offer",
    oldPrice: "Price before discount",
    price: function (n) { return "EGP " + n; },
    waGeneral: "Hello, I have a question about your perfumes",
    waOrder: function (item, price) { return "Hello, I'd like to pre-order:\n" + item + "\nPrice: " + price; },
    waNotify: function (item) { return "Hello, please let me know when " + item + " is available."; },
    priceSoon: "Price coming soon",
    waAsk: function (item) { return "Hello, could you tell me the price of:\n" + item; },
    fileError: "There is a mistake in products.js, probably a missing comma or quotation mark.",
    empty: "No perfumes available right now. Follow us to hear about the next offers.",
    searchPlaceholder: "Search… e.g. musk or safari",
    searchLabel: "Search products",
    searchCount: function (n) { return n + (n === 1 ? " result" : " results"); },
    searchNone: function (q) { return "No products match “" + q + "”. "; },
    searchAsk: "Send us the perfume name on WhatsApp and we’ll check for you",
    waSearch: function (q) { return "Hello, I'm looking for: " + q; },
    reviewAlt: "A message from a customer",
    allCats: "All",
    zoom: "Enlarge image",
    share: "Share product link",
    copied: "Product link copied ✓",
    addToCart: "Add to cart",
    inCart: "In cart ✓",
    added: "Added to cart ✓",
    cartTitle: "Your order",
    cartLabel: "Cart",
    cartCta: "Order all",
    cartPriceLater: "Price to confirm",
    cartTotal: "Total",
    cartDeposit: "Deposit (50%)",
    cartRest: "Pay on delivery",
    cartUnpriced: "Some items’ prices will be confirmed on WhatsApp and aren’t included in the total.",
    cartSend: "Send order on WhatsApp",
    cartClear: "Empty cart",
    cartIntro: "Hello, I'd like to pre-order:",
    cartAsk: "price?",
    cartAskAll: "Could you tell me the prices of the items marked “price?”",
    cartMore: "Add one",
    cartLess: "Remove one",
    cartRemove: "Remove from cart",
    cartConfirmClear: "Empty the whole cart?",
    langButton: "عربي",
    langLabel: "التحويل للعربي",
    toDark: "Dark mode",
    toLight: "Light mode"
  }
};

// التصنيفات: نفس الأسامي اللي في لوحة التحكم (category في products.js)
const CATEGORIES = [
  ["sets", "بكجات", "Sets"],
  ["bodyoud", "بودي عود", "Body Oud"],
  ["sprays", "بخاخات", "Sprays"],
  ["blends", "خلطات ودهن", "Blends & oils"]
];

// اللغة الحالية: "ar" أو "en"
function lang() {
  return root.lang === "en" ? "en" : "ar";
}

// بيحفظ اختيار الزائر علشان لما يرجع يلاقيه زي ما سابه
function remember(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

// بيعمل لينك واتساب بيفتح على رقمك برسالة جاهزة
function whatsappLink(message) {
  return "https://wa.me/" + (CONFIG.whatsapp || "") + "?text=" + encodeURIComponent(message);
}

// بيكتب السعر بالشكل ده: 1,850 جنيه  أو  EGP 1,850
function formatPrice(value) {
  const number = Number(value);
  const text = isNaN(number) ? value : number.toLocaleString("en-US");
  return TEXT[lang()].price(text);
}

// بياخد الكلام الإنجليزي من المنتج لو موجود (زي nameEn)، ولو مش موجود بياخد العربي
function field(product, name) {
  if (lang() === "en" && product[name + "En"]) return product[name + "En"];
  return product[name];
}

// بيعمل عنصر جديد في الصفحة بكلاس ونص
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

// أيقونة الواتساب اللي جوه الزراير
const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

// أيقونة المشاركة اللي على صورة المنتج
const SHARE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>';

// الشكل المؤقت (زجاجة عطر) اللي بيظهر لحد ما تحط صورة حقيقية
const BOTTLE_PLACEHOLDER = '<svg viewBox="0 0 80 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" aria-hidden="true"><rect x="30" y="6" width="20" height="14" rx="3"/><path d="M35 20v10M45 20v10"/><rect x="12" y="30" width="56" height="84" rx="14"/><path d="M26 76h28M30 86h20" stroke-linecap="round" opacity=".6"/></svg>';

function makePlaceholder() {
  const box = el("div", "card-placeholder");
  box.innerHTML = BOTTLE_PLACEHOLDER;
  return box;
}


// ===== 1) نحط الإعدادات في أماكنها في الصفحة =====
function applySettings() {
  // الكلام اللي بيتغير (مدة التسليم، شريط العروض)
  document.querySelectorAll("[data-setting]").forEach(function (node) {
    const value = CONFIG[node.dataset.setting];
    if (value) node.textContent = value;
  });

  // شريط العروض: لو النص بتاع اللغة دي فاضي بنخفيه
  const offerText = lang() === "en" ? CONFIG.offerBarEn : CONFIG.offerBar;
  document.getElementById("offer-bar").hidden = !offerText;

  // كل لينكات الواتساب العامة (الهيدر والفوتر وسياسة الاسترجاع)
  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.href = whatsappLink(TEXT[lang()].waGeneral);
  });

  // لينكات إنستجرام وفيسبوك
  document.querySelectorAll("[data-social]").forEach(function (link) {
    link.href = CONFIG[link.dataset.social] || "#";
  });

  // السنة اللي في آخر الصفحة بتتحدث لوحدها
  document.getElementById("year").textContent = new Date().getFullYear();
}


// ===== 2) نعمل كارت لكل منتج من ملف products.js =====
function createCard(product) {
  const words = TEXT[lang()];
  const name = field(product, "name");
  const size = field(product, "size");
  const description = field(product, "description");

  const card = el("article", "card");
  card.id = "p-" + product.__slug;   // علشان لينك المنتج يفتح عليه على طول
  if (!product.available) card.classList.add("is-soldout");
  // الكلام اللي البحث بيدوّر فيه (بالعربي والإنجليزي)
  card.dataset.search = normalize([product.name, product.nameEn, product.description,
    product.descriptionEn, product.size, product.sizeEn].join(" "));
  card.dataset.category = product.category || "";

  // --- الصورة ---
  const media = el("div", "card-media");
  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = name;
    img.loading = "lazy";
    // الصورة بتكبر لما تدوس عليها
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", words.zoom + ": " + name);
    // لو مسار الصورة غلط، يظهر الشكل المؤقت بدل صورة مكسورة
    img.onerror = function () { img.replaceWith(makePlaceholder()); };
    media.appendChild(img);
  } else {
    media.appendChild(makePlaceholder());
  }

  // --- زرار مشاركة لينك المنتج ---
  const share = el("button", "share-btn");
  share.type = "button";
  share.dataset.slug = product.__slug;
  share.dataset.name = name;
  share.setAttribute("aria-label", words.share + ": " + name);
  share.innerHTML = SHARE_ICON;
  media.appendChild(share);

  // --- شارة "عرض" ---
  if (product.offer) media.appendChild(el("span", "badge", words.offer));
  card.appendChild(media);

  // --- الاسم والحجم والوصف ---
  const body = el("div", "card-body");
  body.appendChild(el("h3", "card-title", name));
  if (size) body.appendChild(el("span", "card-size", size));
  if (description) body.appendChild(el("p", "card-desc", description));

  // --- السعر، والسعر القديم متشطب لو موجود ---
  // لو لسه مفيش سعر (0 أو فاضي) بيظهر "السعر قريبًا"
  const hasPrice = Number(product.price) > 0;
  const priceRow = el("div", "card-price");
  if (!hasPrice) {
    priceRow.appendChild(el("span", "price price-soon", words.priceSoon));
  } else {
    priceRow.appendChild(el("span", "price", formatPrice(product.price)));
  }
  if (hasPrice && Number(product.oldPrice) > Number(product.price)) {
    const old = el("del", "old-price", formatPrice(product.oldPrice));
    old.setAttribute("aria-label", words.oldPrice + " " + formatPrice(product.oldPrice));
    priceRow.appendChild(old);
  }
  body.appendChild(priceRow);

  // --- حالة المنتج ---
  if (product.available) {
    body.appendChild(el("span", "status available", words.available));
  } else {
    body.appendChild(el("span", "status soldout", words.soldout));
  }

  // --- زرار الواتساب برسالة جاهزة ---
  const button = el("a", "btn");
  button.target = "_blank";
  button.rel = "noopener";
  const item = size ? name + " (" + size + ")" : name;
  const label = el("span", "", product.available ? words.order : words.notify);

  if (product.available) {
    button.classList.add("btn-wa");
    // لو مفيش سعر لسه، الرسالة بتسأل عن السعر
    button.href = whatsappLink(hasPrice ? words.waOrder(item, formatPrice(product.price)) : words.waAsk(item));
  } else {
    // لو المنتج نفد: العميل يقدر يطلب يتبلّغ لما يتوفر
    button.classList.add("btn-outline");
    button.href = whatsappLink(words.waNotify(item));
  }
  button.innerHTML = WA_ICON;
  button.appendChild(label);
  body.appendChild(button);

  // --- زرار السلة (للمنتج المتاح بس) ---
  if (product.available) {
    const add = el("button", "btn btn-cart");
    add.type = "button";
    add.dataset.cart = product.__slug;
    body.appendChild(add);
  }

  card.appendChild(body);
  return card;
}

// بيظهّر أو بيخبّي قسم، ومعاه اللينك بتاعه في القايمة اللي فوق
function showSection(id, show) {
  document.getElementById(id).hidden = !show;
  document.querySelectorAll('.main-nav a[href="#' + id + '"]').forEach(function (link) {
    link.hidden = !show;
  });
}

// بيرسم كل الكروت من أول وجديد (بيتنادى تاني لما اللغة تتغير)
// المنتجات اللي عليها «عرض» بتروح قسم العروض، والباقي قسم المنتجات
function renderProducts() {
  const offersGrid = document.getElementById("offers-grid");
  const productsGrid = document.getElementById("products-grid");
  offersGrid.innerHTML = "";
  productsGrid.innerHTML = "";

  const fileOk = typeof PRODUCTS !== "undefined";
  const list = fileOk ? PRODUCTS : [];
  let offersCount = 0;
  let productsCount = 0;
  assignSlugs(list);

  list.forEach(function (product) {
    if (product.offer) {
      offersGrid.appendChild(createCard(product));
      offersCount++;
    } else {
      productsGrid.appendChild(createCard(product));
      productsCount++;
    }
  });

  if (!fileOk) {
    // لو فيه غلطة كتابة في products.js (زي فاصلة أو علامة تنصيص ناقصة)
    productsGrid.appendChild(el("p", "products-msg", TEXT[lang()].fileError));
  } else if (list.length === 0) {
    productsGrid.appendChild(el("p", "products-msg", TEXT[lang()].empty));
  }

  // «خصومات لحد ..%»: أكبر خصم في عروض الافتتاح، متقرّب لتحت لأقرب 5
  // (علشان الرقم يفضل صح لوحده لو الأسعار اتغيرت)
  let maxOff = 0;
  list.forEach(function (product) {
    const price = Number(product.price), old = Number(product.oldPrice);
    if (product.offer && price > 0 && old > price) {
      maxOff = Math.max(maxOff, Math.floor((old - price) * 100 / old));
    }
  });
  const shownOff = Math.floor(maxOff / 5) * 5;
  document.getElementById("max-off").hidden = shownOff < 10;
  document.querySelectorAll("[data-maxoff]").forEach(function (node) {
    node.textContent = shownOff;
  });

  // القسم الفاضي بيستخبى. قسم المنتجات بيفضل ظاهر لو فيه رسالة لازم تتقري
  sectionDefault.offers = offersCount > 0;
  sectionDefault.products = productsCount > 0 || offersCount === 0;
  showSection("offers", sectionDefault.offers);
  showSection("products", sectionDefault.products);

  // البحث بيستخبى لو مفيش منتجات خالص
  document.getElementById("search-band").hidden = list.length === 0;
  renderCategoryChips(list);

  // زرار «تصفّح العطور» اللي فوق بيودّي لأول قسم ظاهر
  document.getElementById("hero-cta").href = offersCount > 0 ? "#offers" : "#products";

  productsBySlug = {};
  list.forEach(function (product) { productsBySlug[product.__slug] = product; });

  applySearch();
  updateCart();
}


// ===== البحث =====
const searchInput = document.getElementById("search");
const searchInfo = document.getElementById("search-info");
const sectionDefault = { offers: true, products: true };
const catChips = document.getElementById("cat-chips");
let activeCat = "";   // "" يعني الكل

// أزرار التصنيفات: بيظهر بس التصنيف اللي فيه منتجات، ولو أقل من تصنيفين الأزرار بتستخبى
function renderCategoryChips(list) {
  const counts = {};
  list.forEach(function (p) { if (p.category) counts[p.category] = (counts[p.category] || 0) + 1; });
  const cats = CATEGORIES.filter(function (c) { return counts[c[0]]; });
  if (activeCat && !counts[activeCat]) activeCat = "";
  catChips.innerHTML = "";
  catChips.hidden = cats.length < 2;
  [["", TEXT[lang()].allCats, TEXT[lang()].allCats]].concat(cats).forEach(function (c) {
    const chip = el("button", "cat-chip", lang() === "en" ? c[2] : c[1]);
    chip.type = "button";
    chip.dataset.cat = c[0];
    chip.setAttribute("aria-pressed", c[0] === activeCat ? "true" : "false");
    catChips.appendChild(chip);
  });
}

catChips.addEventListener("click", function (event) {
  const chip = event.target.closest(".cat-chip");
  if (!chip) return;
  activeCat = chip.dataset.cat;
  catChips.querySelectorAll(".cat-chip").forEach(function (c) {
    c.setAttribute("aria-pressed", c === chip ? "true" : "false");
  });
  applySearch();
});

// بيوحّد الكلام علشان البحث يلاقي «اوشن» و«أوشن» زي بعض
function normalize(text) {
  return String(text || "").toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "")   // التشكيل والتطويل
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 1632); });
}

function applySearch() {
  const query = searchInput.value.trim();
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const filtering = words.length > 0 || activeCat !== "";
  const counts = { offers: 0, products: 0 };

  ["offers", "products"].forEach(function (id) {
    document.getElementById(id + "-grid").querySelectorAll(".card").forEach(function (card) {
      const match = (!activeCat || card.dataset.category === activeCat) &&
        words.every(function (w) { return card.dataset.search.indexOf(w) !== -1; });
      card.hidden = !match;
      if (match) counts[id]++;
    });
    // وانت بتدوّر، القسم اللي مفيهوش نتايج بيستخبى (من غير ما نلمس القايمة اللي فوق)
    document.getElementById(id).hidden = filtering ? counts[id] === 0 : !sectionDefault[id];
  });

  searchInfo.innerHTML = "";
  searchInfo.hidden = !filtering;
  if (!filtering) return;
  const txt = TEXT[lang()];
  const total = counts.offers + counts.products;
  if (total > 0) {
    searchInfo.textContent = txt.searchCount(total);
  } else if (!words.length) {
    searchInfo.textContent = txt.searchCount(0);
  } else {
    searchInfo.appendChild(document.createTextNode(txt.searchNone(query)));
    const link = el("a", "", txt.searchAsk);
    link.href = whatsappLink(txt.waSearch(query));
    link.target = "_blank";
    link.rel = "noopener";
    searchInfo.appendChild(link);
  }
}

searchInput.addEventListener("input", applySearch);
// لما يدوس «بحث» في كيبورد الموبايل: الكيبورد يقفل والصفحة تنزل للنتايج
searchInput.addEventListener("keydown", function (event) {
  if (event.key !== "Enter") return;
  event.preventDefault();
  searchInput.blur();
  const first = ["offers", "products"].map(function (id) { return document.getElementById(id); })
    .filter(function (sec) { return !sec.hidden; })[0];
  if (first && searchInput.value.trim()) first.scrollIntoView({ behavior: "smooth", block: "start" });
});


// ===== لينك لكل منتج =====
// كل منتج بياخد اسم إنجليزي قصير (من الاسم الإنجليزي أو اسم الصورة) علشان اللينك يبقى زي:
// (لينك موقعك)/#p-silk-body-oud
function slugify(text) {
  return String(text || "").toLowerCase().replace(/\.[a-z]+$/, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);
}

function assignSlugs(list) {
  const used = {};
  list.forEach(function (product, i) {
    const image = String(product.image || "").split("/").pop();
    let slug = slugify(product.nameEn) || slugify(image) || "item-" + (i + 1);
    let n = 2;
    while (used[slug]) slug = slug.replace(/-\d+$/, "") + "-" + n++;
    used[slug] = true;
    product.__slug = slug;
  });
}

function productUrl(slug) {
  return location.href.split("#")[0] + "#p-" + slug;
}

// رسالة صغيرة تحت لثانيتين
let toastTimer = 0;
function showToast(text) {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.hidden = true; }, 2200);
}

function shareProduct(slug, name) {
  const url = productUrl(slug);
  // على الموبايل بتفتح قايمة المشاركة (واتساب، إنستجرام...)، وعلى الكمبيوتر بينسخ اللينك
  if (navigator.share) {
    navigator.share({ title: name, url: url }).catch(function () {});
  } else if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(function () { showToast(TEXT[lang()].copied); },
      function () { window.prompt(TEXT[lang()].share, url); });
  } else {
    window.prompt(TEXT[lang()].share, url);
  }
}

// لو حد فتح لينك منتج: نشيل أي فلتر، وننزل للمنتج ونعلّم عليه
function openProductFromHash() {
  if (location.hash.indexOf("#p-") !== 0) return;
  const card = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!card) return;
  if (searchInput.value || activeCat) {
    searchInput.value = "";
    activeCat = "";
    renderProducts();
  }
  const id = card.id;
  function jump() {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: "center", behavior: "instant" });
  }
  jump();
  // الخط بيحمّل بعد شوية وبيغيّر طول الكلام، فبنظبط المكان تاني بعده
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(jump);
  if (document.readyState !== "complete") window.addEventListener("load", jump, { once: true });

  const target = document.getElementById(id);
  target.classList.remove("is-highlight");
  void target.offsetWidth;   // علشان العلامة تتعاد لو دوس على نفس اللينك تاني
  target.classList.add("is-highlight");
}
window.addEventListener("hashchange", openProductFromHash);


// ===== تكبير الصورة =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

function openLightbox(src, caption) {
  if (typeof lightbox.showModal !== "function") { window.open(src, "_blank"); return; }
  lightboxImg.src = src;
  lightboxImg.alt = caption || "";
  lightboxCaption.textContent = caption || "";
  lightboxCaption.hidden = !caption;
  lightbox.showModal();
}

function zoomFrom(img) {
  const card = img.closest(".card");
  openLightbox(img.currentSrc || img.src, card ? card.querySelector(".card-title").textContent : "");
}

document.addEventListener("click", function (event) {
  const add = event.target.closest("[data-cart]");
  if (add) {
    // أول دوسة بتضيف، ولو المنتج في السلة بالفعل بتفتح السلة
    if (cartQty(add.dataset.cart)) openCart();
    else addToCart(add.dataset.cart);
    return;
  }
  const share = event.target.closest(".share-btn");
  if (share) { shareProduct(share.dataset.slug, share.dataset.name); return; }
  const img = event.target.closest(".card-media img, .review-img");
  if (img) zoomFrom(img);
});
document.addEventListener("keydown", function (event) {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches && event.target.matches(".card-media img, .review-img")) {
    event.preventDefault();
    zoomFrom(event.target);
  }
});
// الدوسة على الخلفية السودا أو على زرار × بتقفل
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox || event.target.closest(".lightbox-close")) lightbox.close();
});
lightbox.addEventListener("close", function () { lightboxImg.removeAttribute("src"); });


// ===== سلة الطلبات =====
// السلة بتتحفظ على جهاز العميل بس، علشان لو قفل الصفحة ورجع يلاقيها
const CART_KEY = "teeb-cart";
const CART_MAX = 20;
let productsBySlug = {};
let cart = loadCart();
const cartBar = document.getElementById("cart-bar");
const cartDialog = document.getElementById("cart-dialog");

function loadCart() {
  try {
    const list = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(list)) return [];
    return list.filter(function (i) { return i && typeof i.id === "string" && Number(i.qty) > 0; })
      .map(function (i) { return { id: i.id, qty: Math.min(CART_MAX, Math.floor(Number(i.qty))) }; });
  } catch (e) { return []; }
}

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
}

function cartQty(id) {
  const item = cart.filter(function (i) { return i.id === id; })[0];
  return item ? item.qty : 0;
}

function addToCart(id) {
  const item = cart.filter(function (i) { return i.id === id; })[0];
  if (item) item.qty = Math.min(CART_MAX, item.qty + 1);
  else cart.push({ id: id, qty: 1 });
  saveCart();
  updateCart();
  showToast(TEXT[lang()].added);
}

function setQty(id, qty) {
  cart = cart.map(function (i) { return i.id === id ? { id: id, qty: Math.max(0, Math.min(CART_MAX, qty)) } : i; })
    .filter(function (i) { return i.qty > 0; });
  saveCart();
  updateCart();
}

// المنتجات اللي في السلة ولسه موجودة ومتاحة على الموقع
function cartLines() {
  return cart.map(function (item) { return { item: item, product: productsBySlug[item.id] }; })
    .filter(function (line) { return line.product && line.product.available; });
}

function cartTotals(lines) {
  let total = 0, unpriced = 0, count = 0;
  lines.forEach(function (line) {
    const price = Number(line.product.price);
    count += line.item.qty;
    if (price > 0) total += price * line.item.qty;
    else unpriced += line.item.qty;
  });
  const deposit = Math.ceil(total / 2);
  return { total: total, deposit: deposit, rest: total - deposit, unpriced: unpriced, count: count };
}

function lineLabel(product) {
  const name = field(product, "name"), size = field(product, "size");
  return size ? name + " (" + size + ")" : name;
}

function cartMessage(lines, t) {
  const words = TEXT[lang()];
  const rows = lines.map(function (line, i) {
    const price = Number(line.product.price);
    return (i + 1) + ". " + lineLabel(line.product) + " × " + line.item.qty + " = " +
      (price > 0 ? formatPrice(price * line.item.qty) : words.cartAsk);
  });
  let message = words.cartIntro + "\n" + rows.join("\n");
  if (t.total > 0) {
    message += "\n\n" + words.cartTotal + ": " + formatPrice(t.total) +
      "\n" + words.cartDeposit + ": " + formatPrice(t.deposit);
  }
  if (t.unpriced) message += "\n\n" + words.cartAskAll;
  return message;
}

function updateCart() {
  const words = TEXT[lang()];
  // لو منتج اتشال من الموقع أو نفد، بيتشال من السلة
  const lines = cartLines();
  if (lines.length !== cart.length) { cart = lines.map(function (l) { return l.item; }); saveCart(); }
  const t = cartTotals(lines);

  // زراير الكروت
  document.querySelectorAll("[data-cart]").forEach(function (button) {
    const inCart = cartQty(button.dataset.cart) > 0;
    button.textContent = inCart ? words.inCart : "+ " + words.addToCart;
    button.classList.toggle("in-cart", inCart);
  });

  // الشريط اللي تحت
  const show = t.count > 0;
  cartBar.hidden = !show;
  document.getElementById("cart-count").textContent = t.count;
  document.getElementById("cart-summary").textContent = words.cartLabel + " · " +
    (t.total > 0 ? formatPrice(t.total) : words.cartPriceLater);
  document.getElementById("cart-cta").textContent = words.cartCta;
  document.getElementById("cart-open").setAttribute("aria-label", words.cartTitle);
  document.body.classList.toggle("has-cart", show);
  root.style.setProperty("--cart-bar-h", show ? cartBar.offsetHeight + "px" : "0px");

  if (cartDialog.open) {
    if (show) renderCartDialog(lines, t);
    else cartDialog.close();
  }
}

function renderCartDialog(lines, t) {
  const words = TEXT[lang()];
  document.getElementById("cart-title").textContent = words.cartTitle;
  const list = document.getElementById("cart-items");
  list.innerHTML = "";
  lines.forEach(function (line) {
    const p = line.product, id = line.item.id, price = Number(p.price);
    const li = el("li", "cart-item");
    if (p.image) {
      const img = el("img", "cart-thumb");
      img.src = p.image;
      img.alt = "";
      li.appendChild(img);
    } else {
      li.appendChild(el("span", "cart-thumb"));
    }
    const info = el("div", "cart-info");
    info.appendChild(el("span", "cart-name", field(p, "name")));
    info.appendChild(el("span", "cart-meta", [field(p, "size"), price > 0 ? formatPrice(price) : words.cartPriceLater].filter(Boolean).join(" · ")));
    li.appendChild(info);
    const remove = el("button", "cart-remove", "×");
    remove.type = "button";
    remove.dataset.act = "remove";
    remove.dataset.id = id;
    remove.setAttribute("aria-label", words.cartRemove + ": " + field(p, "name"));
    li.appendChild(remove);
    const qty = el("div", "cart-qty");
    [["dec", "−", words.cartLess, line.item.qty <= 1], ["n", String(line.item.qty)], ["inc", "+", words.cartMore, line.item.qty >= CART_MAX]].forEach(function (b) {
      if (b[0] === "n") { qty.appendChild(el("span", "", b[1])); return; }
      const btn = el("button", "", b[1]);
      btn.type = "button";
      btn.dataset.act = b[0];
      btn.dataset.id = id;
      btn.setAttribute("aria-label", b[2]);
      btn.disabled = b[3];
      qty.appendChild(btn);
    });
    li.appendChild(qty);
    li.appendChild(el("span", "cart-line", price > 0 ? formatPrice(price * line.item.qty) : words.cartAsk));
    list.appendChild(li);
  });

  const totals = document.getElementById("cart-totals");
  totals.innerHTML = "";
  if (t.total > 0) {
    [["total", words.cartTotal, t.total], ["deposit", words.cartDeposit, t.deposit], ["rest", words.cartRest, t.rest]].forEach(function (r) {
      const row = el("div", "cart-row " + r[0]);
      row.appendChild(el("span", "", r[1]));
      row.appendChild(el("span", "", formatPrice(r[2])));
      totals.appendChild(row);
    });
  }
  const note = document.getElementById("cart-note");
  note.textContent = words.cartUnpriced;
  note.hidden = !t.unpriced;

  const send = document.getElementById("cart-send");
  send.innerHTML = WA_ICON;
  send.appendChild(el("span", "", words.cartSend));
  send.href = whatsappLink(cartMessage(lines, t));
  document.getElementById("cart-clear").textContent = words.cartClear;
}

function openCart() {
  const lines = cartLines();
  if (!lines.length) return;
  renderCartDialog(lines, cartTotals(lines));
  if (typeof cartDialog.showModal === "function") cartDialog.showModal();
}

document.getElementById("cart-open").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", function () { cartDialog.close(); });
cartDialog.addEventListener("click", function (event) {
  if (event.target === cartDialog) { cartDialog.close(); return; }   // الدوسة برة الشاشة
  const btn = event.target.closest("[data-act]");
  if (!btn) return;
  const id = btn.dataset.id, qty = cartQty(id);
  if (btn.dataset.act === "inc") setQty(id, qty + 1);
  else if (btn.dataset.act === "dec") setQty(id, qty - 1);
  else if (btn.dataset.act === "remove") setQty(id, 0);
});
document.getElementById("cart-clear").addEventListener("click", function () {
  if (!confirm(TEXT[lang()].cartConfirmClear)) return;
  cart = [];
  saveCart();
  updateCart();
});
// لو السلة اتغيرت من تاب تاني في نفس المتصفح
window.addEventListener("storage", function (event) {
  if (event.key === CART_KEY) { cart = loadCart(); updateCart(); }
});
window.addEventListener("resize", function () {
  if (!cartBar.hidden) root.style.setProperty("--cart-bar-h", cartBar.offsetHeight + "px");
});


// ===== آراء العملاء: سكرين شوتس من reviews.js =====
// لو مفيش ولا صورة، القسم واللينك بتاعه فوق بيستخبوا
function renderReviews() {
  const list = typeof REVIEWS !== "undefined" && Array.isArray(REVIEWS) ? REVIEWS.filter(Boolean) : [];
  const grid = document.getElementById("reviews-grid");
  grid.innerHTML = "";
  list.forEach(function (path) {
    const img = el("img", "review-img");
    img.src = path;
    img.alt = TEXT[lang()].reviewAlt;
    img.loading = "lazy";
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.onerror = function () { img.remove(); };
    grid.appendChild(img);
  });
  showSection("reviews", list.length > 0);
}


// ===== 3) زرار اللغة =====
const langButton = document.getElementById("lang-toggle");

function applyLanguage(newLang) {
  root.lang = newLang;
  root.dir = newLang === "en" ? "ltr" : "rtl";
  document.title = TEXT[newLang].title;

  // كلمة الزرار: "EN" في العربي، و"عربي" في الإنجليزي
  langButton.textContent = TEXT[newLang].langButton;
  langButton.setAttribute("aria-label", TEXT[newLang].langLabel);

  // الأوصاف المخفية اللي بيقراها برنامج قراءة الشاشة للمكفوفين
  document.querySelectorAll("[data-aria-en]").forEach(function (node) {
    if (!node.dataset.ariaAr) node.dataset.ariaAr = node.getAttribute("aria-label");
    node.setAttribute("aria-label", newLang === "en" ? node.dataset.ariaEn : node.dataset.ariaAr);
  });

  // كلام خانة البحث
  searchInput.placeholder = TEXT[newLang].searchPlaceholder;
  searchInput.setAttribute("aria-label", TEXT[newLang].searchLabel);

  applySettings();
  renderProducts();
  renderReviews();
  updateThemeButton();
}

langButton.addEventListener("click", function () {
  const newLang = lang() === "en" ? "ar" : "en";
  remember("lang", newLang);
  applyLanguage(newLang);
});


// ===== 4) زرار الوضع الليلي =====
const themeButton = document.getElementById("theme-toggle");

function isDark() {
  return root.getAttribute("data-theme") === "dark";
}

function updateThemeButton() {
  const words = TEXT[lang()];
  themeButton.setAttribute("aria-label", isDark() ? words.toLight : words.toDark);
  // لون شريط المتصفح فوق في الموبايل
  document.querySelector('meta[name="theme-color"]').content = isDark() ? "#15120f" : "#faf7f2";
}

themeButton.addEventListener("click", function () {
  if (isDark()) {
    root.removeAttribute("data-theme");
    remember("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    remember("theme", "dark");
  }
  updateThemeButton();
});


// ===== 5) أول ما الصفحة تفتح =====
applyLanguage(lang());
openProductFromHash();
