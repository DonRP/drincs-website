export const doLogIn = () => {
    localStorage.setItem("username", "username");
    localStorage.setItem("isLoggedIn", "true.toString()");
};

export const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};

export const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
};