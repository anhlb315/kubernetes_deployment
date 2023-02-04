const Room = require('../../models/Room')

/**
 * 
 * @param {*} player 
 * @returns all rooms player participated in
 */
const listRoomsForPlayer = (player) => {
    return Room.find({ participants: player }).sort({ updatedAt: -1 })
}

const getRoom = (room) => {
    return Room.findById(room);
}

module.exports = {
    listRoomsForPlayer,
    getRoom
}
