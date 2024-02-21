// Importer le module Router d'Express
const router = require("express").Router();

// Importer les fonctions du contrôleur de catégories
const {
    getAll,
    getOne,
    addCategorie,
    editCategorie,
    deleteCategorie,
} = require("../controllers/categorieController");

// Importer le middleware pour vérifier si l'utilisateur est un administrateur
const isAdminMiddleware = require("../middlewares/adminMiddleware");

// Route GET pour récupérer la liste des catégories
router.get("/", getAll);

// Route GET pour récupérer une catégorie par son ID
router.get("/:id", getOne);

// Route POST pour ajouter une nouvelle catégorie (accessible uniquement aux administrateurs)
router.post("/add", isAdminMiddleware, addCategorie);

// Route PUT pour modifier les données d'une catégorie (accessible uniquement aux administrateurs)
router.put("/edit/:id", isAdminMiddleware, editCategorie);

// Route DELETE pour supprimer une catégorie (accessible uniquement aux administrateurs)
router.delete("/delete/:id", isAdminMiddleware, deleteCategorie);

// Exporter le module Router avec les routes définies
module.exports = router;
