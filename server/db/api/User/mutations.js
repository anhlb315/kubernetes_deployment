const User = require('../../models/User');

/**
 * 
 * @param {*} param0 
 * @returns created user
 */
const createUser = ({ username, password }) => {
    const user = new User({
        username, password
    });

    return user.save();
}

const updateUser = async (username, params) => {
    await User.findOneAndUpdate({ username }, params);
}

const giveUserOneScore = async (username) => {
    await User.updateOne({ username }, { $inc: { score: 1 } });
}

module.exports = {
    createUser,
    updateUser,
    giveUserOneScore
}
