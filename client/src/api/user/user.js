import { authentiatedAxios } from "../utils"
import { API_LEADERBOARD_ENDPOINT, API_LIST_MATCH_ENDPOINT, API_USER_INFO_ENDPOINT } from "../variables"

export const getUserInfoAPI = async () => {
    const configuration = {
        method: "get",
        url: API_USER_INFO_ENDPOINT,
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}

export const getLeaderboardAPI = async () => {
    const configuration = {
        method: "get",
        url: API_LEADERBOARD_ENDPOINT,
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}

export const listLastMatchesAPI = async () => {
    const configuration = {
        method: "get",
        url: API_LIST_MATCH_ENDPOINT,
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}
