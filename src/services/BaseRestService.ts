import axios from "axios";
import { HttpResponse } from "model/HttpResponse";
import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from "notistack";

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
        console.log(body)
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

    private inizialHeadersBody(params: object = {}, token?: string, tokenType?: string) {
        let body = "{}"
        try {
            body = JSON.stringify(params)
        } catch (ex) {
            throw Error("BaseRestService post conver JSON issue")
        }

        let option = this.inizialHeaders(
            token,
            tokenType
        )
        return {
            ...option,
            "params": body,
        }
    }

    async getRequest<T>(url: string, token?: string, tokenType?: string): Promise<HttpResponse<T>> {
        return axios.get<T>(url, this.inizialHeaders(token, tokenType))
            .then(this._checkStatus)
            .then(response => {
                return response?.data
            })
            .catch((res) => {
                console.error("getRequest Error", res);
            });
    }

    async postRequest<T>(url: string, body: any = {}, token?: string, tokenType?: string): Promise<HttpResponse<T>> {
        return axios.post<T>(url, this.inizialHeadersBody(body, token, tokenType))
            .then(this._checkStatus)
            .then(response => {
                return response?.data
            })
            .catch((res) => {
                console.error("postRequest Error", res);
            });
    }

    _checkStatus(response: any) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            // error.response = response
            throw error
        }
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

