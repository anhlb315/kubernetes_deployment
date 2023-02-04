const Room = require('../../models/Room');

const createRoom = ({ participants }) => {
    const room = new Room({
        participants
    });

    return room.save();
}

const updateRoom = async (id, params) => {
    await Room.findByIdAndUpdate(id, params);
}

const deleteRoom = async (id) => {
    await Room.findByIdAndDelete(id)
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom
}
