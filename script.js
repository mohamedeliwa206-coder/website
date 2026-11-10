// =====================================================
//  إعدادات المتجر
//  غيّر البيانات اللي هنا بس، وهي هتتغير في الموقع كله لوحدها.
//  (الكلام لازم يفضل بين علامتين التنصيص "كده")
//  الحاجات اللي آخرها En دي النسخة الإنجليزي من نفس الحاجة.
// =====================================================
const SETTINGS = {
  // رقم الواتساب بيزنس: 20 وبعدها رقمك من غير الصفر اللي في الأول (مثال: 201012345678)
  whatsapp: "20XXXXXXXXXX",

  // مدة التسليم اللي بتلتزم بيها
  deliveryTime: "3 أسابيع",
  deliveryTimeEn: "3 weeks",

  // نص شريط العروض اللي فوق العنوان. لو عايز تخفيه خالص اكتب "" بس
  offerBar: "الحجز مفتوح دلوقتي على عروض الكويت",
  offerBarEn: "Pre-orders are open on current Kuwait offers",

  // لينكات السوشيال
  instagram: "#",
  facebook: "#"
};


// =====================================================
//  من هنا ولتحت كود الموقع، مش محتاج تلمسه
// =====================================================

const root = document.documentElement;

// الكلام اللي الكود بيكتبه بنفسه، بالعربي والإنجليزي
const TEXT = {
  ar: {
    title: "طِيب | عطور أصلية من الكويت بسعر أقل من السوق",
    order: "اطلب على واتساب",
    notify: "بلّغني لما يتوفر",
    available: "متاح للحجز",
    soldout: "نفد",
    offer: "عرض",
    oldPrice: "السعر قبل الخصم",
    price: function (n) { return n + " جنيه"; },
    waGeneral: "السلام عليكم، عندي سؤال عن العطور",
    waOrder: function (item, price) { return "السلام عليكم، ممكن أحجز:\n" + item + "\nالسعر: " + price; },
    waNotify: function (item) { return "السلام عليكم، ممكن تبلّغني لما يتوفر " + item + "؟"; },
    fileError: "فيه غلطة في ملف products.js، غالبًا فاصلة أو علامة تنصيص ناقصة. راجع آخر تعديل عملته.",
    empty: "مفيش عطور متاحة دلوقتي، تابعنا علشان تعرف العروض الجاية.",
    langButton: "EN",
    langLabel: "Switch to English",
    toDark: "الوضع الليلي",
    toLight: "الوضع العادي"
  },
  en: {
    title: "Teeb | Original perfumes from Kuwait below market price",
    order: "Order on WhatsApp",
    notify: "Notify me",
    available: "Pre-order open",
    soldout: "Sold out",
    offer: "Offer",
    oldPrice: "Price before discount",
    price: function (n) { return "EGP " + n; },
    waGeneral: "Hello, I have a question about your perfumes",
    waOrder: function (item, price) { return "Hello, I'd like to pre-order:\n" + item + "\nPrice: " + price; },
    waNotify: function (item) { return "Hello, please let me know when " + item + " is available."; },
    fileError: "There is a mistake in products.js, probably a missing comma or quotation mark.",
    empty: "No perfumes available right now. Follow us to hear about the next offers.",
    langButton: "عربي",
    langLabel: "التحويل للعربي",
    toDark: "Dark mode",
    toLight: "Light mode"
  }
};

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
  return "https://wa.me/" + SETTINGS.whatsapp + "?text=" + encodeURIComponent(message);
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
    const value = SETTINGS[node.dataset.setting];
    if (value) node.textContent = value;
  });

  // شريط العروض: لو النص بتاع اللغة دي فاضي بنخفيه
  const offerText = lang() === "en" ? SETTINGS.offerBarEn : SETTINGS.offerBar;
  document.getElementById("offer-bar").hidden = !offerText;

  // كل لينكات الواتساب العامة (الهيدر والفوتر وسياسة الاسترجاع)
  document.querySelectorAll("[data-wa]").forEach(function (link) {
    link.href = whatsappLink(TEXT[lang()].waGeneral);
  });

  // لينكات إنستجرام وفيسبوك
  document.querySelectorAll("[data-social]").forEach(function (link) {
    link.href = SETTINGS[link.dataset.social] || "#";
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
  if (!product.available) card.classList.add("is-soldout");

  // --- الصورة ---
  const media = el("div", "card-media");
  if (product.image) {
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = name;
    img.loading = "lazy";
    // لو مسار الصورة غلط، يظهر الشكل المؤقت بدل صورة مكسورة
    img.onerror = function () { img.replaceWith(makePlaceholder()); };
    media.appendChild(img);
  } else {
    media.appendChild(makePlaceholder());
  }

  // --- شارة "عرض" ---
  if (product.offer) media.appendChild(el("span", "badge", words.offer));
  card.appendChild(media);

  // --- الاسم والحجم والوصف ---
  const body = el("div", "card-body");
  body.appendChild(el("h3", "card-title", name));
  if (size) body.appendChild(el("span", "card-size", size));
  if (description) body.appendChild(el("p", "card-desc", description));

  // --- السعر، والسعر القديم متشطب لو موجود ---
  const priceRow = el("div", "card-price");
  priceRow.appendChild(el("span", "price", formatPrice(product.price)));
  if (Number(product.oldPrice) > Number(product.price)) {
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
    button.href = whatsappLink(words.waOrder(item, formatPrice(product.price)));
  } else {
    // لو المنتج نفد: العميل يقدر يطلب يتبلّغ لما يتوفر
    button.classList.add("btn-outline");
    button.href = whatsappLink(words.waNotify(item));
  }
  button.innerHTML = WA_ICON;
  button.appendChild(label);
  body.appendChild(button);

  card.appendChild(body);
  return card;
}

// بيرسم كل الكروت من أول وجديد (بيتنادى تاني لما اللغة تتغير)
function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";

  if (typeof PRODUCTS === "undefined") {
    // لو فيه غلطة كتابة في products.js (زي فاصلة أو علامة تنصيص ناقصة)
    grid.appendChild(el("p", "products-msg", TEXT[lang()].fileError));
  } else if (PRODUCTS.length === 0) {
    grid.appendChild(el("p", "products-msg", TEXT[lang()].empty));
  } else {
    PRODUCTS.forEach(function (product) {
      grid.appendChild(createCard(product));
    });
  }
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

  applySettings();
  renderProducts();
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
