const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],
        unique: [true, "Username existed"]
    },
    password: {
        type: String,
        required: [true, "Password required"],
        unique: false,
        select: false,
    },
    score: {
        type: Number,
        default: 0,
        unique: false,
    },
    coin: {
        type: Number,
        default: 0,
        unique: false,
    },
    nextLoot: {
        type: Date,
        default: Date.now,
        unique: false,
    }
})

module.exports = mongoose.model("Users", User);
