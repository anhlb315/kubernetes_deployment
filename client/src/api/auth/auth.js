import axios from "axios";
import { API_LOGIN_ENDPOINT, API_REGISTER_ENDPOINT } from "../variables";

export const loginAPI = async ({ username, password }) => {
    const configuration = {
        method: "post",
        url: API_LOGIN_ENDPOINT,
        data: {
            username,
            password
        }
    }
    return axios(configuration);
}

export const registerAPI = async ({ username, password }) => {
    const configuration = {
        method: "post",
        url: API_REGISTER_ENDPOINT,
        data: {
            username,
            password
        }
    }
    return axios(configuration);
}