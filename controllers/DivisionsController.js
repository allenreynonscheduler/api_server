const Divisions = require("../models/Divisions");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const divisions = await Divisions.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Divisions.countDocuments({ status: 1 });
    
        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: divisions.sort((a, b) => b.createdAt - a.createdAt)
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
            'league_id': 'required|string',
            'description': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Divisions({ ...newData, password: 'test' });
        await query.save();
        res.status(201).json({ message: "Record Successfuly Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const divisions = await Divisions.findById(req.params.id);
        if (!divisions) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(divisions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'abbreviation': 'required|string',
            'description': 'required|string',
            'league_id': 'required|string'
        });
        if(validate){ res.status(400).send(validate); return; }

        const divisions = await Divisions.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!divisions) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Updated", divisions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Leagues.findByIdAndDelete(req.params.id);
        const divisions = await Divisions.deleteOne({ _id: req.params.id });
        if (!divisions) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.divisionlist = async (req, res) => {
    try {
        const division = await Divisions.find();
        res.status(200).json({
            data: division.sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};