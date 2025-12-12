const Profile = require('../models/Profile');
const Ens = require('../models/Ens');
const db = require('../database/db');

exports.getStudentProfile = (req, res) => {
    const { email } = req.params;
    const sql = `SELECT * FROM profile WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.getAllEns = (req, res) => {
    const sql = `SELECT * FROM ens`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};