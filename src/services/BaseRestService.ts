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

class BaseRestService {
    constructor(enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) {
        if (enqueueSnackbar) {
            this.enqueueSnackbar = enqueueSnackbar
        }
    }
    urlwebapi = this.geturlwebapi()
    urlwebapiold = this.geturlwebapiold();
    urlwebapivercel = this.geturlwebapivercel()
    enqueueSnackbar: null | ((message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey) = null
    private geturlwebapi(): string {
        if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
            return "http://localhost:7289"
        }
        else {
            return "https://drincs-website-back-end.onrender.com/api"
        }
    }
    private geturlwebapiold(): string {
        if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
            return "https://localhost:7289"
        }
        else {
            return "https://drincs-website-back-end-old.onrender.com"
        }
    }
    private geturlwebapivercel(): string {
        if (process.env.NODE_ENV !== 'production' && use_local_webapi) {
            return "http://localhost:7289"
        }
        else {
            return "https://drincs-website-back-end.vercel.app/api"
        }
    }
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

    async customFetch<T>(url: URL | string, options: any = {}, token?: string, tokenType = "Bearer"): Promise<HttpResponse<T>> {
        // performs api calls sending the required authentication headers
        const headers: HeadersType = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (token) {
            // Setting Authorization header
            // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
            headers['Authorization'] = tokenType + ' ' + token
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => {
                return response.json()
            })
            .catch((res) => {
                console.error("fetch Error", res);
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

