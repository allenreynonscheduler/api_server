const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: false },
    league_id: { type: String, required: false },
    description: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Divisions", Schema);