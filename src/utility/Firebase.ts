import { getAnalytics } from '@firebase/analytics';
import { getApps, initializeApp } from 'firebase/app';
import { logError } from './Logger';

export function initializeFirebaseApp() {
    if (getApps().length > 0) {
        return
    }

    initializeApp({
        apiKey: process.env.FIREBASE_WEBSITE_WEBAPI_APIKEY,
        authDomain: process.env.FIREBASE_WEBSITE_WEBAPI_AUTHDOMAIN,
        projectId: process.env.FIREBASE_WEBSITE_WEBAPI_PROJECTID,
        storageBucket: process.env.FIREBASE_WEBSITE_WEBAPI_STORAGEBUCKET,
        messagingSenderId: process.env.FIREBASE_WEBSITE_WEBAPI_MESSAGINGSENDERID,
        appId: process.env.FIREBASE_WEBSITE_WEBAPI_APPID,
        measurementId: process.env.FIREBASE_WEBSITE_WEBAPI_MEASUREMENTID,
    })
}

export function getFirebaseAnalytics() {
    initializeFirebaseApp()
    try {
        return getAnalytics()
    }
    catch (ex) {
        logError("Firebase getFirebaseAnalytics", ex)
        throw Error("Firebase getFirebaseAnalytics")
    }
}
