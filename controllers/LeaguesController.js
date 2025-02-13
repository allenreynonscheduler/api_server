const Leagues = require("../models/Leagues");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const leagues = await Leagues.find({ status: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Leagues.countDocuments({ status: 1 });

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: leagues
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
        const query = new Leagues({ ...newData, password: 'test' });
        await query.save();
        res.status(201).json({ message: "Successfully created." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const league = await Leagues.findById(req.params.id);
        if (!league) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(league);
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

        const league = await Leagues.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!league) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Successfully updated", league });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Leagues.findByIdAndDelete(req.params.id);
        const league = await Leagues.findByIdAndUpdate(req.params.id, { status: 0 });
        if (!league) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};