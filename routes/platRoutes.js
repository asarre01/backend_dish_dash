// Importer le module Router d'Express
const router = require("express").Router();

const { uploadImgPlat } = require("../controllers/imageController");
// Importer les fonctions du contrôleur de plats
const {
    getAll,
    getPlatsByCategorie,
    addPlat,
    editPlat,
    deletePlat,
} = require("../controllers/platController");

// Importer le middleware pour vérifier si l'utilisateur est un administrateur
const isAdminMiddleware = require("../middlewares/adminMiddleware");
const { verifyToken } = require("../middlewares/authMiddlewares");

// Route GET pour récupérer la liste des plats
router.get("/", getAll);

// Route GET pour récupérer une plat par son ID
router.get("/:categorieId", getPlatsByCategorie);

// Route POST pour ajouter une nouvelle plat (accessible uniquement aux administrateurs)
router.post("/add", verifyToken, isAdminMiddleware, uploadImgPlat, addPlat);

// Route PUT pour modifier les données d'une plat (accessible uniquement aux administrateurs)
router.put("/edit/:id", verifyToken, isAdminMiddleware, editPlat);

// Route DELETE pour supprimer une plat (accessible uniquement aux administrateurs)
router.delete("/delete/:id", verifyToken, isAdminMiddleware, deletePlat);

// Exporter le module Router avec les routes définies
module.exports = router;
