const { createRoomAPI, listRoomAPI, deleteRoomAPI, listRoomChatAPI, getActiveMatchAPI } = require("../../api")

const createRoom = async (player) => {
    return createRoomAPI(player).then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const listRooms = async () => {
    return listRoomAPI().then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const deleteRoom = async (room) => {
    return deleteRoomAPI(room).then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const listRoomChat = async (room) => {
    return listRoomChatAPI(room).then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

const getActiveMatch = async (room) => {
    return getActiveMatchAPI(room).then((result) => {
        console.log(result);
        return result;
    }).catch(err => { console.log(err); throw err; });
}

export const RoomService = {
    createRoom,
    listRooms,
    deleteRoom,
    listRoomChat,
    getActiveMatch,
}