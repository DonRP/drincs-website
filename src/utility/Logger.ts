import { Logtail } from "@logtail/browser";
import { analyticException } from "./Analytics";

function logtailIsAvailable(useAnalytic: boolean) {
    if (import.meta.env.VITE_LOGTAIL_WEBSITE_KEY === undefined) {
        if (useAnalytic) {
            analyticException("Logtail key not found")
        }
        console.warn("Logtail key not found.")
        return false;
    }
}

export function logInfo(message: string, body: any = "", useAnalytic: boolean = true) {
    if (logtailIsAvailable(useAnalytic)) {
        try {
            let logtail = new Logtail(import.meta.env.VITE_LOGTAIL_WEBSITE_KEY || "");
            logtail.info(message, body);
        }
        catch (ex) {
            if (useAnalytic) {
                analyticException("Logtail error")
            }
            console.error("Logtail error.", ex)
        }
    }
    console.info(message)
}


export function logWarn(message: string, body: any = "", useAnalytic: boolean = true) {
    if (logtailIsAvailable(useAnalytic)) {
        try {
            let logtail = new Logtail(import.meta.env.VITE_LOGTAIL_WEBSITE_KEY || "");
            logtail.warn(message, body);
        }
        catch (ex) {
            if (useAnalytic) {
                analyticException("Logtail error")
            }
            console.error("Logtail error.", ex)
        }
    }
    console.warn(message)
}

export function logError(message: string, body: any = "", useAnalytic: boolean = true) {
    if (useAnalytic) {
        analyticException(message)
    }
    if (logtailIsAvailable(useAnalytic)) {
        try {
            let logtail = new Logtail(import.meta.env.VITE_LOGTAIL_WEBSITE_KEY || "");
            logtail.error(message, body);
        }
        catch (ex) {
            if (useAnalytic) {
                analyticException("Logtail error")
            }
            console.error("Logtail error.", ex)
        }
    }
    console.error(message)
}
