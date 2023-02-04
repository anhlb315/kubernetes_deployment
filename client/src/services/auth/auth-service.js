import { loginAPI, registerAPI } from "../../api"
import { cookies } from "../../cookies"

const login = async ({ username, password }) => {
    return loginAPI({ username, password }).then((result) => {
        console.log(result);
        cookies.set("TOKEN", result.data.token, {
            path: "/"
        })
    }).catch(err => { console.log(err); throw err; })
}

const register = async ({ username, password }) => {
    return registerAPI({ username, password }).then((result) => {
        console.log(result)
    }).catch(err => { console.log(err); throw err; })
}

const logout = async () => {
    cookies.remove("TOKEN", { path: "/" });
}

export const AuthService = {
    login,
    register,
    logout
}
