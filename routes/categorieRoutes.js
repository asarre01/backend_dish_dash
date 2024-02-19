const router = require("express").Router();
const {
    getAll,
    addCategorie,
    editCategorie,
    deleteCategorie,
} = require("../controllers/categorieController");
const Categorie = require("../models/Categorie");
// Route GET pour récupérer la liste des catégories
router.get("/", getAll);

// Route POST pour ajouter une nouvelle catégorie
router.post("/add", addCategorie);

// Route PUT pour modifier les données d'une catégorie
router.put("/edit/:id", editCategorie);

// Route DELETE pour supprimer une catégorie
router.delete("/delete/:id", deleteCategorie);

module.exports = router;
