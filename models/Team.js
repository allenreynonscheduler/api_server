const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    conference_id: { type: String, required: true },
    division_id: { type: String, required: true },
    teammanager: { type: String, required: true },
    teammanager_email: { type: String, required: true },
    alternatemanager_name: { type: String, required: true },
    alternatemanager_email: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Number, default: 1, required: false }
}, { timestamps: true });

module.exports = mongoose.model("Team", Schema);