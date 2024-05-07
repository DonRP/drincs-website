import { getAnalytics } from '@firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { logError } from './Logger';

export function initializeFirebaseApp() {
    if (getApps().length > 0) {
        return
    }

    initializeApp({
        apiKey: import.meta.env.VITE_FIREBASE_WEBSITE_APIKEY,
        authDomain: import.meta.env.VITE_FIREBASE_WEBSITE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_WEBSITE_PROJECTID,
        storageBucket: import.meta.env.VITE_FIREBASE_WEBSITE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_WEBSITE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASE_WEBSITE_APPID,
        measurementId: import.meta.env.VITE_FIREBASE_WEBSITE_MEASUREMENTID,
    })
}

export function firebaseIsAvailable() {
    if (!import.meta.env.VITE_FIREBASE_WEBSITE_APIKEY) {
        logError("Firebase key not found", {}, false)
        return false
    }
    return true
}

export function getFirebaseAnalytics() {
    initializeFirebaseApp()
    try {
        return getAnalytics()
    }
    catch (ex) {
        logError("Firebase getFirebaseAnalytics", ex, false)
        throw Error("Firebase getFirebaseAnalytics")
    }
}
