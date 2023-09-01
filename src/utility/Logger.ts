import { Logtail } from "@logtail/browser";
import { analyticException } from "./Analytics";

function logtailIsAvailable() {
    if (process.env.REACT_APP_LOGTAIL_WEBSITE_KEY === undefined) {
        analyticException("Logtail key not found")
        console.info("Logtail key not found.")
        return false;
    }
}

export function logInfo(message: string, body: any = "", useAnalytic: boolean = true) {
    if (logtailIsAvailable()) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
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
    if (logtailIsAvailable()) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
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
    if (logtailIsAvailable()) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
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
