import { authentiatedAxios } from "../utils"
import { API_ACTIVE_MATCH_ENDPOINT, API_CREATE_ROOM_ENDPOINT, API_DELETE_ROOM_ENDPOINT, API_LIST_ROOM_ENDPOINT, API_ROOM_CHAT_ENDPOINT } from "../variables"

export const createRoomAPI = async (player) => {
    const configuration = {
        method: "post",
        url: API_CREATE_ROOM_ENDPOINT,
        data: {
            player
        }
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}

export const listRoomAPI = async () => {
    const configuration = {
        method: "get",
        url: API_LIST_ROOM_ENDPOINT,
    }
    return authentiatedAxios(configuration).then((result) => result.data.data)
}

export const deleteRoomAPI = async (room) => {
    const configuration = {
        method: "post",
        url: API_DELETE_ROOM_ENDPOINT,
        data: {
            room
        }
    }
    return authentiatedAxios(configuration).then((result) => result.data.data);
}

export const listRoomChatAPI = async (room) => {
    const configuration = {
        method: "get",
        url: API_ROOM_CHAT_ENDPOINT,
        params: {
            room
        }
    }
    return authentiatedAxios(configuration).then((result) => result.data.data);
}

export const getActiveMatchAPI = async (room) => {
    const configuration = {
        method: "get",
        url: API_ACTIVE_MATCH_ENDPOINT,
        params: {
            room
        }
    }
    return authentiatedAxios(configuration).then((result) => result.data.data);
}
