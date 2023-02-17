import { AuthData } from "model/Auth/AuthData";
import { LoginAccount } from "model/Auth/LoginAccount";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import BaseRestService from "./BaseRestService";

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};

class AuthService extends BaseRestService {
    async doLogIn(account: LoginAccount, rememberMe: boolean) {
        if (!account) {
            return false
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');

        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(account)
        };

        return this.customFetch<AuthData>(this.urlwebapi + `/Auth/SignInWithEmailAndPassword`, requestOptions)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    // TODO: log
                    return false
                }
                if (rememberMe) {
                    localStorage.setItem("username", response.content.username ?? "");
                    localStorage.setItem("username_token", response.content.token ?? "");
                }
                else {
                    sessionStorage.setItem("username", response.content.username ?? "");
                    sessionStorage.setItem("username_token", response.content.token ?? "");
                }
                return true
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                    return false
                });
            });
    };

    async resetPoassword(email: string) {
        return true
    };

    async SignUp(account: NewAccountRecord) {
        if (!account) {
            return false
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json;charset=utf-8');

        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(account)
        };

        return this.customFetch<AuthData>(this.urlwebapi + `/Auth/CreateAccount`, requestOptions)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    // TODO: log
                    return false
                }
                return true
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                    return false
                });
            });
    };

    async logOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("username_token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("username_token");
    };
}

export default AuthService;