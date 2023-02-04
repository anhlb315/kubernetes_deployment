const Message = require('../../models/Message');

const createMessage = ({
    type, from, to, match, msg
}) => {
    const message = new Message({
        type, from, to, match, msg
    });

    return message.save();
}

const updateMessage = async (id, params) => {
    await Message.findByIdAndUpdate(id, params);
}

const deleteMessagesInRoom = (room) => {
    return Message.deleteMany({ room })
}

module.exports = {
    createMessage,
    updateMessage,
    deleteMessagesInRoom,
}
