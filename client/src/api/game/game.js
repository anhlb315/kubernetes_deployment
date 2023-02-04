import { authentiatedAxios } from "../utils"
import { API_PLAY_ENDPOINT, API_RANDOM_MATCH_ENDPOINT } from "../variables"

export const playAPI = async ({ room, move }) => {
    const configuration = {
        method: "post",
        url: API_PLAY_ENDPOINT,
        data: {
            room,
            type: "move",
            msg: move
        }
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}

export const joinRandomMatchAPI = async () => {
    const configuration = {
        method: "post",
        url: API_RANDOM_MATCH_ENDPOINT,
    }
    return authentiatedAxios(configuration).then((result) => result.data.data);
}
