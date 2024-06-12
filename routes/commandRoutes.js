// Importer le module Router d'Express
const router = require("express").Router();

// Importer les fonctions du contrôleur de commandes
const {
    ajouterCommande,
    validerPaiement,
    validerStatut,
    getAllCommandes,
} = require("../controllers/commandeController");

// Importer le middleware pour vérifier si l'utilisateur est un administrateur
const isAdminMiddleware = require("../middlewares/adminMiddleware");
const { verifyToken } = require("../middlewares/authMiddlewares");

// Routes
router.post("/ajouter", ajouterCommande);
router.put(
    "/valider-paiement/:commandeId",
    verifyToken,
    isAdminMiddleware,
    validerPaiement
);
router.put(
    "/valider-statut/:commandeId",
    verifyToken,
    isAdminMiddleware,
    validerStatut
);
router.get("/all", verifyToken, isAdminMiddleware, getAllCommandes);

// Exporter le module Router avec les routes définies
module.exports = router;
