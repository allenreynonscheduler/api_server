const Team = require("../models/Team");
const validator = require("../helper/validator");

exports.index = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const team = await Team.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Team.countDocuments({ status: 1 });
    
        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            data: team.sort((a, b) => b.createdAt - a.createdAt)
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
            'conference_id': 'required|string',
            'division_id': 'required|string',
            'teammanager': 'required|string',
            'teammanager_email': 'required|string',
            'alternatemanager_name': 'required|string',
            'alternatemanager_email': 'required|string',
            'address': 'required|string',
            'description': 'required|string',
            // 'status': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const { _id, ...newData } = req.body; // Extract everything except _id
        const query = new Team({ ...newData, password: 'test' });
        await query.save();
        res.status(201).json({ message: "Record Successfuly Created" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.show = async (req, res, next) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res, next) => {
    try {

        let validate = validator(req, res, next, {
            'name': 'required|string',
            'abbreviation': 'required|string',
            'conference_id': 'required|string',
            'division_id': 'required|string',
            'teammanager': 'required|string',
            'teammanager_email': 'required|string',
            'alternatemanager_name': 'required|string',
            'alternatemanager_email': 'required|string',
            'address': 'required|string',
            'description': 'required|string',
        });
        if(validate){ res.status(400).send(validate); return; }

        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Updated", team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async (req, res, next) => {
    try {
        // const league = await Leagues.findByIdAndDelete(req.params.id);
        const team = await Team.deleteOne({ _id: req.params.id });
        if (!team) {
            return res.status(400).json({ message: "Data not found" });
        }
        res.status(200).json({ message: "Record Successfuly Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};