import { logEvent } from '@firebase/analytics';
import { getFirebaseAnalytics } from './Firebase';
import { logError } from './Logger';

export function analyticPageView(page_title: string, page_path?: string) {
    if (process.env.NODE_ENV !== 'production') {
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
        logError("analyticPageView", err)
    }
}

export function analyticLogin(method: string) {
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "login", {
            method: method
        });
    }
    catch (err) {
        logError("analyticLogin", err)
    }
}

export function analyticSignUp(method: string) {
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    try {
        const analytics = getFirebaseAnalytics();
        logEvent(analytics, "sign_up", {
            method: method
        });
    }
    catch (err) {
        logError("analyticSignUp", err)
    }
}
