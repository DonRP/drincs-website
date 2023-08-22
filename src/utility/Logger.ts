import { Logtail } from "@logtail/node";

export function logInfo(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.LOGTAIL_WEBAPI_KEY || "");
            logtail.info(message, body);
        }
        catch (ex) { }
    }
    console.info(message, body)
}


export function logWarn(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.LOGTAIL_WEBAPI_KEY || "");
            logtail.warn(message, body);
        }
        catch (ex) { }
    }
    console.info(message, body)
}

export function logError(message: string, body: any = "") {
    if (process.env.NODE_ENV === 'production') {
        try {
            let logtail = new Logtail(process.env.LOGTAIL_WEBAPI_KEY || "");
            logtail.error(message, body);
        }
        catch (ex) { }
    }
    console.info(message, body)
}

export function logTest(): string {
    try {
        let logtail = new Logtail(process.env.LOGTAIL_WEBAPI_KEY || "");
        logtail.info("test", {});
        return true.toString()
    }
    catch (ex) {
        console.error(ex)
        return false.toString()
    }
}