export class MyError extends Error {
    constructor(message?: string, messagesToShow?: string) {
        super(message);
        this.messagesToShow = messagesToShow
    }
    messagesToShow?: string
    errorFields: string[] = []
    messages: string | string[] = "";
}
