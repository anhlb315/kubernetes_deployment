const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    type: { /* move / message */
        type: String,
        required: [true, "Type required"],
    },
    from: {
        type: String,
        required: [true, "From required"],
    },
    to: {
        type: String,
        required: [true, "To required"]
    },
    match: {
        type: String,
        required: false,
    },
    msg: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Messages", Message);
