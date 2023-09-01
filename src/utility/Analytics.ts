import { logEvent } from '@firebase/analytics';
import { firebaseIsAvailable, getFirebaseAnalytics } from './Firebase';

export function analyticPageView(page_title: string, page_path?: string) {
    if (!firebaseIsAvailable()) {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "page_view", {
            page_title: page_title,
            page_path: page_path,
        });
    }
    catch (err) {
        // * not use logError here to avoid infinite loop
        console.error("analyticPageView", err)
    }
}

export function analyticLogin(method: string) {
    if (!firebaseIsAvailable()) {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "login", {
            method: method
        });
    }
    catch (err) {
        // * not use logError here to avoid infinite loop
        console.error("analyticLogin", err)
    }
}

export function analyticSignUp(method: string) {
    if (!firebaseIsAvailable()) {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "sign_up", {
            method: method
        });
    }
    catch (err) {
        // * not use logError here to avoid infinite loop
        console.error("analyticSignUp", err)
    }
}

export function analyticException(description: string, fatal: boolean = false) {
    if (!firebaseIsAvailable()) {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "exception", {
            fatal: fatal,
            description: description,
        });
    }
    catch (err) {
        // * not use logError here to avoid infinite loop
        console.error("analyticException", err)
    }
}
