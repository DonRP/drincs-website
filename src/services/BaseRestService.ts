import { HttpResponse } from "model/HttpResponse";

type HeadersType = {
    'Accept': string
    'Content-Type': string
    'Authorization'?: string
}

class BaseRestService {
    urlwebapi = this.geturlwebapi();
    private geturlwebapi(): string {
        if (process.env.NODE_ENV !== 'production') {
            return "https://localhost:7289"
        }
        else {
            return "https://drincs-website-back-end.onrender.com"
        }
    }
    showError(body: any) {
        // TODO: ti improve
        console.log(body)
        if (body.error) {
            window.alert(body.error)
        } else if (body.message) {
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
}
export default BaseRestService;

