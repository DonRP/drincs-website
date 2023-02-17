import { LoginAccount } from "model/Auth/LoginAccount";
import { NewAccountRecord } from "model/Auth/NewAccountRecord";
import BaseRestService from "./BaseRestService";

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};

class AuthService extends BaseRestService {
    async doLogIn(account: LoginAccount, rememberMe: boolean) {
        localStorage.setItem("username", "username");
        localStorage.setItem("isLoggedIn", "true.toString()");
        return true
    };

    async resetPoassword(email: string) {
        return true
    };

    async SignUp(account: NewAccountRecord) {
        return true
    };

    async logOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
    };
}

export default AuthService;