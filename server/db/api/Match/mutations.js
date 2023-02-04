const Match = require('../../models/Match');

const createMatch = ({
    room
}) => {
    const match = new Match({
        room
    });

    return match.save();
}

const updateMatch = async (id, params) => {
    await Match.findByIdAndUpdate(id, params);
}

module.exports = {
    createMatch,
    updateMatch,
}
