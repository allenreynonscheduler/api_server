const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    firstname: String,
    lastname: { type: String, unique: true },
    birthdate: Date
}, { timestamps: true });

module.exports = mongoose.model("UserInfo", Schema);
