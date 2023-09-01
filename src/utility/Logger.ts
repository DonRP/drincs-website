import { Logtail } from "@logtail/browser";
import { analyticException } from "./Analytics";

export function logInfo(message: string, body: any = "") {
    if (!process.env.REACT_APP_LOGTAIL_WEBSITE_KEY) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.info(message, body);
        }
        catch (ex) { }
    }
    else {
        console.info("Logtail key not found.")
    }
    console.info(message)
}


export function logWarn(message: string, body: any = "") {
    if (!process.env.REACT_APP_LOGTAIL_WEBSITE_KEY) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.warn(message, body);
        }
        catch (ex) {
            console.info("Logtail key not found.")
        }
    }
    console.warn(message)
}

export function logError(message: string, body: any = "") {
    analyticException(message)
    if (!process.env.REACT_APP_LOGTAIL_WEBSITE_KEY) {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.error(message, body);
        }
        catch (ex) {
            console.info("Logtail key not found.")
        }
    }
    console.error(message)
}
