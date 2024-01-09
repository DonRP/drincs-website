import { logEvent } from '@firebase/analytics';
import { firebaseIsAvailable, getFirebaseAnalytics } from './Firebase';
import { logError } from './Logger';

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
        logError("analyticPageView", err, false)
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
        logError("analyticLogin", err, false)
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
        logError("analyticSignUp", err, false)
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
        logError("analyticException", err, false)
    }
}
