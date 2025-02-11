const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: false },
    description: { type: String, required: false },
    status: { type: Number, default: 1, required: false },
    date_start: { type: Date, required: false },
    date_end: { type: Date, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Season", Schema);
