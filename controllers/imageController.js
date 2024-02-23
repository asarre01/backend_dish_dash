// Importer les bibliothèques nécessaires
const multer = require("multer");
const path = require("path");

// Middleware de téléchargement du photo  de l'avatar(upload)
const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        // Spécifie le dossier de destination pour les fichiers uploadés
        cb(null, "public/profiles");
    },
    filename: function (req, file, cb) {
        // Génère un nom de fichier unique basé sur le numéro de téléphone (tel) et la date actuelle
        const ext = path.extname(file.originalname);
        const filename = `${req.body.tel}_${Date.now()}${ext}`;
        cb(null, filename);
    },
});

// Configuration du middleware multer avec le stockage spécifié
exports.uploadAvatar = multer({ storage: storageAvatar }).single("image");

const storageImgPlat = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/imgPlats"); 
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const filename = `${name}${ext}`;
        cb(null, filename);
    },
});

exports.uploadImgPlat = multer({ storage: storageImgPlat }).single("image");

const storageImgCat = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/imgCats"); 
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "_" + Math.round(Math.random() * 1e9);
        const filename = `${name}${ext}`;
        cb(null, filename);
    },
});

exports.uploadImgCat = multer({ storage: storageImgCat }).single("image");
