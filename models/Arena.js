const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    shortform: { type: String, required: true },
    league_id: { type: String, required: true },
    season_id: { type: String, required: true },
    rink: { type: String, required: true },
    description: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Arena", Schema);