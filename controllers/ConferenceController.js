const Conference = require("../models/Conference");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const conference = await Conference.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Conference.countDocuments({ status: 1 });
    
        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: conference.sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.store = async (req, res, next) => {
    try {
        let validate = validator(req, res, next, {
            'name': 'required|string',
            'description': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Conference({ ...newData, password: 'test' });
        await query.save();
        res.status(201).json({ message: "Record Successfuly Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const conference = await Conference.findById(req.params.id);
        if (!conference) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(conference);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'description': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const conference = await Conference.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!conference) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Updated", conference });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Leagues.findByIdAndDelete(req.params.id);
        const conference = await Conference.deleteOne({ _id: req.params.id });
        if (!conference) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.conferencelist = async (req, res) => {
    try {
        const conference = await Conference.find();
        res.status(200).json({
            data: conference.sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};