const mongoose = require("mongoose");

const Room = new mongoose.Schema({
    participants: [{
        type: String,
    }],
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Rooms", Room);
