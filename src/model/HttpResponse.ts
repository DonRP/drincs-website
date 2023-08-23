import { StatusCodes } from "http-status-codes";

export class HttpResponse<T> {
    content?: T;
    messages: string | string[] = "";
    messagesToShow?: string;
    statusCodes: StatusCodes = StatusCodes.OK;
    isSuccessStatusCode: boolean = true;
}
