const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let subfolder;
        if (file.fieldname === 'sujet') {
            subfolder = 'subjects';
        } else {
            const studentMatricule = req.body.matricule || 'inconnu';
            subfolder = path.join('submissions', studentMatricule);
        }
        
        const uploadPath = path.join('uploads', subfolder);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
module.exports = upload;