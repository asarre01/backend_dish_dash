const router = require("express").Router();
const User = require("../models/User");
const { register, login, logout } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { editUser, getAll } = require("../controllers/userController");
const isAdminMiddleware = require("../middlewares/adminMiddleware");
const {uploadAvatar}  = require("../controllers/imageController.js");

// Route POST pour l'ajout d'un nouvel utilisateur
router.post("/add", uploadAvatar, register);

// Route GET pour récupérer la liste des utilisateursrouter.get("/", verifyToken, isAdminMiddleware, getAll);

// Route POST pour la connexion d'un utilisateur
router.post("/login", login);

// Route POST pour la déconnexion d'un utilisateur (avec vérification du token)
router.post("/logout", verifyToken, logout);

router.put("/edit/:id", verifyToken, editUser);

// Exporter le routeur pour le rendre disponible pour d'autres fichiers
module.exports = router;
