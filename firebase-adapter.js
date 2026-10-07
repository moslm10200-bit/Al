import {
  FIREBASE_CART_COLLECTION,
  FIREBASE_ENABLED,
  firebaseConfig,
} from "./firebase-config.js";

const CART_KEY = "sukab-cart";

function hasFirebaseConfig() {
  return (
    FIREBASE_ENABLED &&
    Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId)
  );
}

export function loadLocalCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(
        ([, quantity]) => Number.isInteger(quantity) && quantity > 0,
      ),
    );
  } catch (error) {
    console.error("تعذرت قراءة السلة المحفوظة.", error);
    return {};
  }
}

export function saveLocalCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let firestorePromise;
let firestoreModulePromise;
let pendingSave = Promise.resolve();

function getFirestoreModule() {
  if (!firestoreModulePromise) {
    firestoreModulePromise = import(
      /* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"
    );
  }
  return firestoreModulePromise;
}

async function getFirestore() {
  if (!hasFirebaseConfig()) return null;
  if (!firestorePromise) {
    firestorePromise = (async () => {
      const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
        import(
          /* @vite-ignore */ "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"
        ),
        getFirestoreModule(),
      ]);
      const app = getApps()[0] || initializeApp(firebaseConfig);
      return getFirestore(app);
    })();
  }
  return firestorePromise;
}

function getVisitorId() {
  const storageKey = "alsukab-visitor-v1";
  let id = localStorage.getItem(storageKey);
  if (!id) {
    id = globalThis.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(storageKey, id);
  }
  return id;
}

export async function loadCart() {
  const db = await getFirestore();
  if (!db) return loadLocalCart();

  const { doc, getDoc } = await getFirestoreModule();
  const snapshot = await getDoc(
    doc(db, FIREBASE_CART_COLLECTION, getVisitorId()),
  );
  if (!snapshot.exists()) return loadLocalCart();

  const cart = snapshot.data().cart;
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
    throw new Error("بيانات السلة المحفوظة في Firebase غير صالحة.");
  }
  saveLocalCart(cart);
  return cart;
}

export function saveCart(cart) {
  if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
    throw new TypeError("يجب أن تكون السلة كائناً يحتوي على كميات المنتجات.");
  }

  saveLocalCart(cart);
  pendingSave = pendingSave.catch(() => {}).then(async () => {
    const db = await getFirestore();
    if (!db) return;
    const { doc, setDoc } = await getFirestoreModule();
    await setDoc(doc(db, FIREBASE_CART_COLLECTION, getVisitorId()), {
      cart,
      updatedAt: new Date().toISOString(),
    });
  });
  return pendingSave;
}

export async function clearCart() {
  await saveCart({});
}
