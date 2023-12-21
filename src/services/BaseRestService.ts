import axios, { AxiosError } from "axios";
import { HttpResponse } from "model/HttpResponse";
import { MyError } from "model/MyError";
import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from "notistack";
import { logError } from "utility/Logger";

type HeadersType = {
    'Accept': string
    'Content-Type': string
    'Authorization'?: string
}

export const showMessage = (enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey, message: string | undefined | null, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
};

const use_local_webapi = false

export function geturlwebapi(): string {
    if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
        return "http://localhost:7289/api"
    }
    else {
        return "https://drincs-website-back-end.onrender.com/api"
    }
}
export function geturlwebapiold(): string {
    if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
        return "https://localhost:7289"
    }
    else {
        return "https://drincs-website-back-end-old.onrender.com"
    }
}
export function geturlwebapivercel(): string {
    if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
        return "http://localhost:7289/api"
    }
    else {
        return "https://drincs-website-back-end.vercel.app/api"
    }
}

class BaseRestService {
    urlwebapi = geturlwebapi()
    urlwebapiold = geturlwebapiold();
    urlwebapivercel = geturlwebapivercel()

    private catchResult(ex: any): MyError {
        let res = new MyError()
        if (ex instanceof AxiosError) {
            if (ex.code === AxiosError.ERR_NETWORK) {
                res.messages = ex.response?.data?.messages
                res.messagesToShow = "There was an error a network error"
            }
            if (ex.code === AxiosError.ERR_BAD_REQUEST) {
                res.messages = AxiosError.ERR_BAD_REQUEST
                res.messagesToShow = "There was an error a bad request"
            }
            else if (ex.response?.data) {
                try {
                    if (ex.response?.data?.messages) {
                        res.messages = ex.response?.data?.messages
                    }
                    if (ex.response?.data?.messagesToShow) {
                        res.messagesToShow = ex.response?.data?.messagesToShow
                    }
                    else if (ex.response?.data?.message) {
                        res.messagesToShow = ex.response?.data?.message
                    }
                    else {
                        res.messagesToShow = "There was an error in the server"
                    }
                }
                catch (ex) {
                    logError("BaseRestService.catchResult() error", ex)
                }
            }
        }
        else if (ex instanceof MyError) {
            res = ex
        }
        else {
            if (ex instanceof Error) {
                res.messages = ex.message
            }
            res.messagesToShow = "err_generic"
        }
        return res
    }

    private inizialHeaders(token?: string, tokenType = "Bearer") {
        // performs api calls sending the required authentication headers
        const headers: HeadersType = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        }

        if (token) {
            // Setting Authorization header
            // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
            headers['Authorization'] = tokenType + ' ' + token
        }

        return {
            "headers": headers,
        }
    }

    async getRequest<T>(url: string, token?: string, tokenType?: string): Promise<HttpResponse<T>> {
        return axios.get<HttpResponse<T>>(url, this.inizialHeaders(token, tokenType))
            .then(response => {
                return response?.data
            })
            .catch((ex) => {
                throw this.catchResult(ex)
            });
    }

    async postRequest<T>(url: string, body: any = {}, token?: string, tokenType?: string): Promise<HttpResponse<T>> {
        return axios.post<HttpResponse<T>>(url, body, this.inizialHeaders(token, tokenType))
            .then(response => {
                return response?.data
            })
            .catch((ex) => {
                throw this.catchResult(ex)
            });
    }
}

export default BaseRestService;
