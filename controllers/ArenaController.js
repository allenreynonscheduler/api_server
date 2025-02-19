const Arena = require("../models/Arena");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const arena = await Arena.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Arena.countDocuments({ status: 1 });
    
        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: arena.sort((a, b) => b.createdAt - a.createdAt)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.store = async (req, res, next) => {
    try {
        let validate = validator(req, res, next, {
            'name': 'required|string',
            'code': 'required|string',
            'shortform': 'required|string',
            'league_id': 'required|string',
            'season_id': 'required|string',
            'rink': 'required|string',
            'description': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Arena({ ...newData, password: 'test' });
        await query.save();
        res.status(201).json({ message: "Record Successfuly Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const arena = await Arena.findById(req.params.id);
        if (!arena) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(arena);
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

        const arena = await Arena.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!arena) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Updated", arena });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Leagues.findByIdAndDelete(req.params.id);
        const arena = await Arena.deleteOne({ _id: req.params.id });
        if (!arena) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};