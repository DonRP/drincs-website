import { AuthData } from "model/Auth/AuthData";
import { LoginAccount } from "model/Auth/LoginAccount";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import { UserProfile } from "model/Auth/UserProfile";
import { MyError } from "model/MyError";
import { analyticLogin, analyticSignUp } from "utility/Analytics";
import BaseRestService from "./BaseRestService";

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("access_token") ?? sessionStorage.getItem("access_token"));
};

class AuthService extends BaseRestService {
    async doLogIn(account: LoginAccount, rememberMe: boolean = false) {
        if (!account) {
            return false
        }

        return this.postRequest<AuthData>(this.urlwebapi + `/Auth/SignInWithEmailAndPassword`, account)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                if (rememberMe) {
                    localStorage.setItem("access_token", response.content.token ?? "");
                }
                else {
                    sessionStorage.setItem("access_token", response.content.token ?? "");
                }
                analyticLogin("/Auth/SignInWithEmailAndPassword")
                return true
            })
            .catch((res) => {
                throw res
            });
    };

    async forgotPassword(email: string) {
        if (!email) {
            return false
        }

        return this.postRequest<string>(this.urlwebapi + `/Auth/ForgotPassword?email=${email}`)
            .then(response => {
                if (!response || !response.isSuccessStatusCode) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return true
            })
            .catch((res) => {
                throw res
            });
    };

    async signUp(account: NewAccountRecord) {
        if (!account) {
            return false
        }

        return this.postRequest<boolean>(this.urlwebapi + `/Auth/CreateAccount`, account)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                analyticSignUp("/Auth/CreateAccount")
                return true
            })
            .catch((res) => {
                throw res
            });
    };

    async getProfile() {
        let token = this.geToken()
        if (!token) {
            console.error("AuthService.getProfile token not found")
            throw new MyError("err_token_not_found")
        }

        return this.getRequest<UserProfile>(this.urlwebapi + `/Auth/GetProfile`, token)
            .then(response => {
                if (!response || !response.isSuccessStatusCode || !response.content) {
                    throw new MyError(response?.messages.toString(), response?.messagesToShow)
                }
                return response.content
            })
            .catch((res) => {
                throw res
            });
    }

    logOut() {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
    };
}

export default AuthService;
