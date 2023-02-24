class HttpResponseMessage {
    version: any;
    content: any;
    statusCode: any;
    reasonPhrase: string | null = null;
    headers: any;
    trailingHeaders: any;
    requestMessage: any | null;
    isSuccessStatusCode: boolean = false;
}

export class HttpResponse<T> extends HttpResponseMessage {
    content: T | undefined;
    messages: string = "";
    messagesAlert: string | null = null;
    messagesToShow: string | null = null;
}