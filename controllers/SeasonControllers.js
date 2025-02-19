const Season = require("../models/Season");
const validator = require("../helper/validator");
const { format } = require('date-fns');
exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const query = await Season.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Season.countDocuments();

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: query
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.store = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'league_id': 'required|string',
            'description': 'required|string'
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Season({ ...newData });
        await query.save();
        res.status(201).json({ message: "Record Successfuly Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const seasons = await Season.findById(req.params.id);
        if (!seasons) {
            return res.status(400).json({ message: "Data not found" });
        }
         const formattedSeason = {
        ...seasons.toObject(),
            date_start: format(seasons.date_start, 'yyyy-MM-dd'), // Format as 'YYYY-MM-DD HH:mm:ss'
            date_end: format(seasons.date_end, 'yyyy-MM-dd') // Format as 'YYYY-MM-DD HH:mm:ss'
        };
        res.status(200).json(formattedSeason);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'league_id': 'required|string',
            'description': 'required|string'
        });
        if(validate){ res.status(400).send(validate); return; }

        const query = await Season.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!query) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Updated", query });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Season.findByIdAndDelete(req.params.id);
        const query = await Season.findByIdAndUpdate(req.params.id, { status: 0 });
        if (!query) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.seasonlist = async (req, res) => {
    try {
        const season = await Season.find({ status: 1 });
        res.status(200).json({
            data: season.sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

