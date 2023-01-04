const doLogIn = (username: string) => {
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", true.toString());
};

const isLoggedIn = () => {
    return Boolean(localStorage.getItem("isLoggedIn"));
};


const logOut = (props: any) => {

    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    props.history.push("/login");

};

export default {
    doLogIn,
    isLoggedIn,
    logOut
};
