// إعداد اختياري لـ Firebase.
// المتجر يعمل دون Firebase افتراضياً؛ السلة تُحفظ على جهاز الزائر.
// إذا رغبت في ربط Firebase لاحقاً، أضف بيانات مشروعك وفعّل FIREBASE_ENABLED.
export const FIREBASE_ENABLED = false;

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

export const FIREBASE_CART_COLLECTION = "sukab-carts";
