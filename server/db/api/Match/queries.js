const Match = require('../../models/Match')

/**
 * 
 * @param {*} player 
 * @returns get last 15 (completed) matches
 */
const listMatchesForPlayer = (player) => {
    return Match.find({
        $or: [{ winner: player }, { losers: player }]
    }).limit(15).sort({ createdAt: -1 })
}

const getActiveMatchInRoom = (room) => {
    return Match.findOne({ room });
}

module.exports = {
    listMatchesForPlayer,
    getActiveMatchInRoom,
}
