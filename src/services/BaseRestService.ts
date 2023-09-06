import axios, { AxiosError } from "axios";
import { HttpResponse } from "model/HttpResponse";
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
    constructor(enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) {
        if (enqueueSnackbar) {
            this.enqueueSnackbar = enqueueSnackbar
        }
    }
    urlwebapi = geturlwebapi()
    urlwebapiold = geturlwebapiold();
    urlwebapivercel = geturlwebapivercel()
    enqueueSnackbar: null | ((message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) = null

    showError(body: any) {
        this.showMessage("There was an error in the server", 'error')
        logError("fech", body)
        if (body.error) {
            window.alert(body.error)
        }
        else if (body.messagesToShow) {
            window.alert(body.messagesToShow)
        }
        else if (body.message) {
            window.alert(body.message)
        } else {
            window.alert("basdfas")
        }
        throw Object.assign(
            new Error(body)
        );
    }

    private catchResult<T>(ex: any): HttpResponse<T> {
        let res = new HttpResponse<T>()
        res.isSuccessStatusCode = false
        if (ex instanceof AxiosError) {
            if (ex.code === AxiosError.ERR_NETWORK) {
                res.messages = ex.response?.data?.messages
                res.messagesToShow = "There was an error a network error"
            }
            if (ex.code === AxiosError.ERR_BAD_REQUEST) {
                res.messages = AxiosError.ERR_BAD_REQUEST
                res.messagesToShow = "There was an error a bad request"
            }
            else if (ex.response?.data && ex.response?.data instanceof AxiosError) {
                return res
            }
        }
        else {
            if (ex instanceof Error) {
                res.messages = ex.message
            }
            res.messagesToShow = "There was an error in the client"
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
                return this.catchResult<T>(ex)
            });
    }

    async postRequest<T>(url: string, body: any = {}, token?: string, tokenType?: string): Promise<HttpResponse<T>> {
        return axios.post<HttpResponse<T>>(url, body, this.inizialHeaders(token, tokenType))
            .then(response => {
                return response?.data
            })
            .catch((ex) => {
                return this.catchResult<T>(ex)
            });
    }

    showMessage = (message: string | undefined | null, variant: VariantType) => {
        if (this.enqueueSnackbar) {
            if (!message) {
                message = "There was an error in the server"
            }
            this.enqueueSnackbar(message, { variant });
        }
    };
}
export default BaseRestService;

