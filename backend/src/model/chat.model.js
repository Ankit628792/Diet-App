const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        groupName: { type: String, trim: true },
        adminName: { type: String, trim: true },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;