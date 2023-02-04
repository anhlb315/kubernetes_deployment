const Message = require('../../models/Message');

/**
 * 
 * @param {*} room 
 * @returns all messages in room
 */
const listMessagesInRoom = (room) => {
    return Message.find({ to: room }).limit(50).sort({ createdAt: - 1 })
}

const getUserLastUserMoveFromMatch = (user, match) => {
    return Message.findOne({ match: match, from: user });
}

const getLastMoveFromMatch = (match) => {
    return Message.findOne({ match })
}

module.exports = {
    listMessagesInRoom,
    getUserLastUserMoveFromMatch,
    getLastMoveFromMatch
}
