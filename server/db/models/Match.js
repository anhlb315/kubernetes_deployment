const mongoose = require("mongoose");

const Match = new mongoose.Schema({
    room: {
        type: String,
        required: [true, "Room required"]
    },
    winner: {
        type: String,
    },
    losers: [{
        type: String,
    }],
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Matches", Match);
