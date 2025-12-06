"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "am" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    pos: "POS",
    orders: "Orders",
    products: "Products",
    customers: "Customers",
    reports: "Reports",
    settings: "Settings",
    notifications: "Notifications",
    profile: "Profile",
    logout: "Logout",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete Product",
    addCustomer: "Add Customer",
    editCustomer: "Edit Customer",
    addOrder: "Add Order",
    viewOrder: "View Order",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    price: "Price",
    quantity: "Quantity",
    stock: "Stock",
    category: "Category",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    export: "Export",
    import: "Import",
    delete: "Delete",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    view: "View",
    list: "List View",
    card: "Card View",
    kanban: "Kanban View",
    newProduct: "New Product",
    newCustomer: "New Customer",
    newOrder: "New Order",
    total: "Total",
    subtotal: "Subtotal",
    tax: "Tax",
    discount: "Discount",
    payment: "Payment",
    paymentMethod: "Payment Method",
    cash: "Cash",
    card: "Card",
    mobile: "Mobile Money",
    change: "Change",
    paymentSuccess: "Payment Successful",
    noData: "No data available",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
  },
  am: {
    dashboard: "ዳሽቦርድ",
    pos: "POS",
    orders: "ትዕዛዞች",
    products: "ምርቶች",
    customers: "ደንበኞች",
    reports: "ሪፖርቶች",
    settings: "ቅንብሮች",
    notifications: "ማሳወቂያዎች",
    profile: "መገለጫ",
    logout: "ውጣ",
    addProduct: "ምርት ያክሉ",
    editProduct: "ምርት ያርትዑ",
    deleteProduct: "ምርት ይሰርዙ",
    addCustomer: "ደንበኛ ያክሉ",
    editCustomer: "ደንበኛ ያርትዑ",
    addOrder: "ትዕዛዝ ያክሉ",
    viewOrder: "ትዕዛዝ ይመልከቱ",
    name: "ስም",
    email: "ኢሜል",
    phone: "ስልክ",
    address: "አድራሻ",
    price: "ዋጋ",
    quantity: "ብዛት",
    stock: "ክምችት",
    category: "ምድብ",
    search: "ፈልግ",
    filter: "ማጣሪያ",
    sort: "መደርደር",
    export: "ላክ",
    import: "አስገባ",
    delete: "ሰርዝ",
    edit: "ያርትዑ",
    save: "ያስቀምጡ",
    cancel: "ይቅር",
    confirm: "አረጋግጡ",
    view: "ይመልከቱ",
    list: "ዝርዝር ውሂብ",
    card: "ካርድ ወ",
    kanban: "ካንባን ወ",
    newProduct: "አዲስ ምርት",
    newCustomer: "አዲስ ደንበኛ",
    newOrder: "አዲስ ትዕዛዝ",
    total: "ጠቅላላ",
    subtotal: "ንዑስ ጠቅላላ",
    tax: "ታክስ",
    discount: "ቅናሽ",
    payment: "ክፍያ",
    paymentMethod: "የክፍያ ዘዴ",
    cash: "ገንዘብ",
    card: "ካርድ",
    mobile: "ሞባይል ገንዘብ",
    change: "ለውጥ",
    paymentSuccess: "ክፍያ ተሳክቷል",
    noData: "ምንም ውሂብ የለም",
    loading: "ይጠበቃል...",
    error: "ስህተት",
    success: "ተሳክተው",
    warning: "ማስጠንቀቂያ",
  },
  ar: {
    dashboard: "لوحة المعلومات",
    pos: "POS",
    orders: "الطلبات",
    products: "المنتجات",
    customers: "العملاء",
    reports: "التقارير",
    settings: "الإعدادات",
    notifications: "إخطارات",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    addProduct: "إضافة منتج",
    editProduct: "تعديل منتج",
    deleteProduct: "حذف منتج",
    addCustomer: "إضافة عميل",
    editCustomer: "تعديل العميل",
    addOrder: "إضافة طلب",
    viewOrder: "عرض الطلب",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "هاتف",
    address: "عنوان",
    price: "السعر",
    quantity: "الكمية",
    stock: "المخزون",
    category: "الفئة",
    search: "بحث",
    filter: "تصفية",
    sort: "ترتيب",
    export: "تصدير",
    import: "استيراد",
    delete: "حذف",
    edit: "تعديل",
    save: "حفظ",
    cancel: "إلغاء",
    confirm: "تأكيد",
    view: "عرض",
    list: "عرض القائمة",
    card: "عرض البطاقة",
    kanban: "عرض كانبان",
    newProduct: "منتج جديد",
    newCustomer: "عميل جديد",
    newOrder: "طلب جديد",
    total: "الإجمالي",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة",
    discount: "خصم",
    payment: "دفع",
    paymentMethod: "طريقة الدفع",
    cash: "نقد",
    card: "بطاقة",
    mobile: "محفظة رقمية",
    change: "تغيير",
    paymentSuccess: "تم الدفع بنجاح",
    noData: "لا توجد بيانات",
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    warning: "تحذير",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("pos-language") as Language
    if (stored && ["en", "am", "ar"].includes(stored)) {
      setLanguageState(stored)
      updateDirection(stored)
    } else {
      updateDirection("en")
    }
  }, [])

  const updateDirection = (lang: Language) => {
    if (typeof window === "undefined") return
    if (lang === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = lang === "am" ? "am" : "en"
    }
  }

  const setLanguage = (lang: Language) => {
    localStorage.setItem("pos-language", lang)
    setLanguageState(lang)
    updateDirection(lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || key
  }

  // Don't return empty until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
