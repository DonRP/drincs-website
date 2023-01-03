
class AuthService {
    async fetch(url, token, options, tokenType = "Bearer") {
        // performs api calls sending the required authentication headers
        const headers = {
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
                // console.log(response);
                return response.json()
            })
            .catch((res) => {
                console.log(res);
            });
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
export default AuthService;


export function showError(body) {
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