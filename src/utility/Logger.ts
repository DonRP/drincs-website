import { Logtail } from "@logtail/browser";

export function logInfo(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.info(message, body);
        }
        catch (ex) { }
    }
    console.info(message)
}


export function logWarn(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.warn(message, body);
        }
        catch (ex) { }
    }
    console.warn(message)
}

export function logError(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.REACT_APP_LOGTAIL_WEBSITE_KEY || "");
            logtail.error(message, body);
        }
        catch (ex) { }
    }
    console.error(message)
}
