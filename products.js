// =====================================================
//  لستة المنتجات
//  الأسهل تضيف وتعدّل المنتجات من لوحة التحكم: (لينك موقعك)/admin
//  الملف ده بيتكتب لوحده من هناك.
//
//  لو هتعدّله بإيدك، القواعد:
//  - كل منتج بيبدأ بـ {  وبيخلص بـ  },  (الفاصلة دي لازم حتى بعد آخر منتج)
//  - ترتيب المنتجات هنا هو نفس ترتيبها في الموقع
//  - الكلام لازم يبقى بين علامتين تنصيص "كده"
//  - الأرقام (السعر) من غير تنصيص ومن غير كلمة جنيه
//  - oldPrice: السعر قبل الخصم، ولو مفيش خصم اكتب 0
//  - offer: true = يظهر عليه شارة "عرض" | false = من غير شارة
//  - available: true = متاح للحجز | false = نفد
//  - image: مسار الصورة زي "images/perfume1.jpg"، ولو فاضي "" هيظهر شكل مؤقت
//  - الحاجات اللي آخرها En دي النسخة الإنجليزي، ولو فاضية هيظهر العربي مكانها
// =====================================================

const PRODUCTS = [
  {
    name: "مسك الختام",
    nameEn: "",
    description: "عطر من عبدالصمد القرشي",
    descriptionEn: "Abdul Samad Al Qurashi perfume",
    size: "100 مل",
    sizeEn: "100 ml",
    price: 7000,
    oldPrice: 11000,
    offer: true,
    available: true,
    image: "images/products/perfume-mwas82r4.jpg"
  },
  {
    name: "بكج المسك مع بخاخ مسك الجسم",
    nameEn: "Musk Set with Body Musk Spray",
    description: "من عبدالصمد القرشي:\nمسك الختام\nمسك الجسم (بخاخ 30 مل)\nمسك رنة خلخال",
    descriptionEn: "By Abdul Samad Al Qurashi:\nAl Khitam Musk\nBody Musk (30 ml spray)\nRanet Khalkhal Musk",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/musk-set-with-body-musk-spray.jpg"
  },
  {
    name: "بكج التولة",
    nameEn: "Tola Musk Set",
    description: "من عبدالصمد القرشي:\nمسك الختام (توله)\nمسك الغزال الأسود (ربع توله)\nمسك الجسم - مسك العروس (توله)",
    descriptionEn: "By Abdul Samad Al Qurashi:\nAl Khitam Musk (1 tola)\nMusk Al Ghazal Al Aswad (¼ tola)\nBody Musk - Musk Al Arous (1 tola)",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/tola-musk-set.jpg"
  },
  {
    name: "بكج المجموعة العربية",
    nameEn: "Arabic Collection Set",
    description: "من عبدالصمد القرشي:\nرنة خلخال (زهري أنثوي منعش)\nمسك الختام (ورد طائفي وياسمين)\nمسك الجسم (مسك بودري ناعم)",
    descriptionEn: "By Abdul Samad Al Qurashi:\nRanet Khalkhal (fresh feminine floral)\nAl Khitam Musk (Taifi rose & jasmine)\nBody Musk (soft powdery musk)",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/arabic-collection-set.jpg"
  },
  {
    name: "بكج العود والبخور",
    nameEn: "Oud & Incense Set",
    description: "من عبدالصمد القرشي:\nعود بخور معطر - هيل\nساتان بودي عود\nعود بخور معطر - عود أزرق",
    descriptionEn: "By Abdul Samad Al Qurashi:\nPerfumed Incense Agarwood - Cardamom\nSatin Body Oud\nPerfumed Incense Agarwood - Blue Agarwood",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/oud-incense-set.jpg"
  },
  {
    name: "بكج البودي عود",
    nameEn: "Body Oud Set",
    description: "من عبدالصمد القرشي:\nبلو أوشن بودي عود (100 مل)\nمسك عبد الصمد - بودي مسك (80 مل)\nساتان بودي عود (100 مل)",
    descriptionEn: "By Abdul Samad Al Qurashi:\nBlue Ocean Body Oud (100 ml)\nMusk Abdul Samad - Body Musk (80 ml)\nSatin Body Oud (100 ml)",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/body-oud-set.jpg"
  },
  {
    name: "بكج بلو ستار وقرشي بلند",
    nameEn: "Blue Star & Qurashi Blend Set",
    description: "من عبدالصمد القرشي:\nبلو ستار (100 مل)\nقرشي بلند (90 مل)\nمسك وردي - بودي مسك روز بيرل",
    descriptionEn: "By Abdul Samad Al Qurashi:\nBlue Star (100 ml)\nQurashi Blend (90 ml)\nBody Musk Rose Pearl",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 0,
    oldPrice: 0,
    offer: false,
    available: true,
    image: "images/products/blue-star-qurashi-blend-set.jpg"
  },
];
