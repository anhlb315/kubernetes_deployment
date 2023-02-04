import axios from "axios";
import { cookies } from '../cookies'

export const authentiatedAxios = async (payload) => {
    const token = cookies.get("TOKEN");

    const configuration = {
        ...payload,
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return axios(configuration);
}