const Season = require("../models/Season");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const query = await Season.find({ status: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Season.countDocuments({ status: 1 });

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
            'abbreviation': 'required|string',
            'description': 'required|string'
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Season({ ...newData });
        await query.save();
        res.status(201).json({ message: "Successfully created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const query = await Season.findById(req.params.id);
        if (!query) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(query);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'abbreviation': 'required|string',
            'description': 'required|string'
        });
        if(validate){ res.status(400).send(validate); return; }

        const query = await Season.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!query) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Successfully updated", query });
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
        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};