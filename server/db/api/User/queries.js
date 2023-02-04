const User = require('../../models/User');

/**
 * 
 * @param {*} username 
 * @returns user with username
 */
const getUser = (username) => {
    return User.findOne({
        username
    });
}

const getUserWithPassword = (username) => {
    return User.findOne({ username }).select('+password');
}

/**
 * 
 * @returns top 10 players
 */
const listTopPlayers = () => {
    return User.find().limit(10).sort({ score: - 1 });
}

/**
 * 
 * @returns one random player
 */
const getRandomPlayer = () => {
    return User.aggregate([{
        $sample: { size: 1 }
    }])
}

/**
 * 
 * @param {*} input 
 * @returns at most 15 matched player
 */
const searchPlayer = (input) => {
    return User.find({ "username": { $regex: input } }).limit(15).sort({ score: -1 });
}

module.exports = {
    getUser,
    listTopPlayers,
    getRandomPlayer,
    searchPlayer,
    getUserWithPassword
}
