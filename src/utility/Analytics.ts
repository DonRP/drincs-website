import { getAnalytics, logEvent } from '@firebase/analytics';

export function analyticHome() {
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    try {
        const analytics = getAnalytics();
        logEvent(analytics, "page_view", {
            page_title: "home",
        });
    }
    catch (err) {
        console.log(err)
    }
}

export function analyticLogin(method: string) {
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    try {
        const analytics = getAnalytics();
        logEvent(analytics, "login", {
            method: method
        });
    }
    catch (err) {
        console.log(err)
    }
}

export function analyticSignUp(method: string) {
    if (process.env.NODE_ENV !== 'production') {
        return
    }
    try {
        const analytics = getAnalytics();
        logEvent(analytics, "sign_up", {
            method: method
        });
    }
    catch (err) {
        console.log(err)
    }
}
