const router = require("express").Router();
const User = require("../models/User");
const { register, login } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/authMiddlewares");
const fs = require("fs-extra");
const {
    editUser,
    getAll,
    deleteUser,
} = require("../controllers/userController");

// Route POST pour l'ajout d'un nouvel utilisateur
router.post("/add",register);

// Route GET pour récupérer la liste des utilisateursrouter.get("/", verifyToken, isAdminMiddleware, getAll);

// Route POST pour la connexion d'un utilisateur
router.post("/login", login);

router.put("/edit/:id", verifyToken, editUser);

router.delete("/delete/:id", verifyToken, deleteUser);

// Exporter le routeur pour le rendre disponible pour d'autres fichiers
module.exports = router;
