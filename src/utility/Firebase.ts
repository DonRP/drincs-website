import { getAnalytics } from '@firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';

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
        // * not use logError here to avoid infinite loop
        console.error("Firebase key not found")
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
        // * not use logError here to avoid infinite loop
        console.error("Firebase getFirebaseAnalytics", ex)
        throw Error("Firebase getFirebaseAnalytics")
    }
}
