export const doLogIn = (rememberMe: boolean): boolean => {
    localStorage.setItem("username", "username");
    localStorage.setItem("isLoggedIn", "true.toString()");
    return true
};

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};

export const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
};