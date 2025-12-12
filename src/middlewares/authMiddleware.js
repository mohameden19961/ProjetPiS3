exports.isProf = (req, res, next) => {
    const { role } = req.headers; 
    if (role !== 'prof') {
        return res.status(403).json({ error: "Accès refusé : réservé aux professeurs" });
    }
    next();
};

exports.isActive = (req, res, next) => {
    const { user_id } = req.headers;
    const db = require('../database/db');
    
    db.get("SELECT inActive FROM users WHERE id = ?", [user_id], (err, user) => {
        if (user && user.inActive === 1) {
            return res.status(403).json({ error: "Votre session a été suspendue par le professeur"  });
        }
        next();
    });
};