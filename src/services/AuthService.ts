import { AuthData } from "model/Auth/AuthData";
import { LoginAccount } from "model/Auth/LoginAccount";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import { analyticLogin, analyticSignUp } from "utility/Analytics";
import BaseRestService from "./BaseRestService";

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("username_token"));
};
export const getUserName = (): string => {
    return localStorage.getItem("username") || "";
};

class AuthService extends BaseRestService {
    async doLogIn(account: LoginAccount, rememberMe: boolean) {
        if (!account) {
            return false
        }

        return this.postRequest<AuthData>(this.urlwebapi + `/Auth/SignInWithEmailAndPassword`, account)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    this.showMessage(response?.messagesToShow, 'error')
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
                analyticLogin("/Auth/SignInWithEmailAndPassword")
                return true
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                    return false
                });
            });
    };

    async resetPassword(email: string) {
        if (!email) {
            return false
        }

        return this.postRequest<string>(this.urlwebapi + `/Auth/ResetPassword?email=${email}`)
            .then(response => {
                if (!response || !response.isSuccessStatusCode) {
                    this.showMessage(response?.messagesToShow, 'error')
                    return false
                }
                this.showMessage("Email was sent to reset the password", 'success');
                return true
            })
            .catch((res) => {
                return res.response.json().then((body: any) => {
                    this.showError(body)
                    return false
                });
            });
    };

    async signUp(account: NewAccountRecord) {
        if (!account) {
            return false
        }

        return this.postRequest<AuthData>(this.urlwebapi + `/Auth/CreateAccount`, account)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    this.showMessage(response?.messagesToShow, 'error')
                    return false
                }
                analyticSignUp("/Auth/CreateAccount")
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