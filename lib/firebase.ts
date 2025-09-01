import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
  var __FIREBASE_APP_CHECK__: boolean | undefined;
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

if (typeof window !== "undefined" && !globalThis.__FIREBASE_APP_CHECK__) {
  if (process.env.NEXT_PUBLIC_APPCHECK_DEBUG === "true") {
    // @ts-expect-error – App Check debug token not typed
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_RECAPTCHA_V3_KEY! 
    ),
    isTokenAutoRefreshEnabled: true,
  });

  globalThis.__FIREBASE_APP_CHECK__ = true;
}

export async function ensureSignedInAnonymously(): Promise<string> {
  if (typeof window === "undefined") return ""; 
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser!.uid;
}
