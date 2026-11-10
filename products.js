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
    name: "عطر تجريبي 1",
    nameEn: "Sample Perfume 1",
    description: "عطر من عبدالصمد القرشي",
    descriptionEn: "Abdul Samad Al Qurashi perfume",
    size: "100 مل",
    sizeEn: "100 ml",
    price: 1850,
    oldPrice: 2400,
    offer: true,
    available: true,
    image: ""
  },
  {
    name: "عطر تجريبي 2",
    nameEn: "Sample Perfume 2",
    description: "عطر من عبدالصمد القرشي",
    descriptionEn: "Abdul Samad Al Qurashi perfume",
    size: "75 مل",
    sizeEn: "75 ml",
    price: 2200,
    oldPrice: 0,
    offer: false,
    available: true,
    image: ""
  },
  {
    name: "بكج تجريبي 3",
    nameEn: "Sample Gift Set 3",
    description: "بكج هدايا من عبدالصمد القرشي",
    descriptionEn: "Abdul Samad Al Qurashi gift set",
    size: "3 قطع",
    sizeEn: "3 pieces",
    price: 3500,
    oldPrice: 4100,
    offer: true,
    available: false,
    image: ""
  },
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
];
