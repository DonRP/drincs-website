import { getAnalytics } from '@firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { logError } from './Logger';

export function initializeFirebaseApp() {
    if (getApps().length > 0) {
        return
    }

    initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_WEBSITE_APIKEY,
        authDomain: process.env.REACT_APP_FIREBASE_WEBSITE_AUTHDOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_WEBSITE_PROJECTID,
        storageBucket: process.env.REACT_APP_FIREBASE_WEBSITE_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_WEBSITE_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_FIREBASE_WEBSITE_APPID,
        measurementId: process.env.REACT_APP_FIREBASE_WEBSITE_MEASUREMENTID,
    })
}

export function firebaseIsAvailable() {
    if (!process.env.REACT_APP_FIREBASE_WEBSITE_APIKEY) {
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
