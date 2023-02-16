import BaseRestService from "./BaseRestService";

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};

class AuthService extends BaseRestService {
    async doLogIn(rememberMe: boolean) {
        localStorage.setItem("username", "username");
        localStorage.setItem("isLoggedIn", "true.toString()");
        return true
    };

    async logOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
    };
}

export default AuthService;