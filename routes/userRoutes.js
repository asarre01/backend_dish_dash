const router = require("express").Router();
const User = require("../models/User");
const { register } = require("../controllers/authentification");

// Route GET pour récupérer la liste des catégories
router.get("/", async (req, res) => {
    try {
        const listUsers = await User.find();
        res.json(listUsers);
        console.log(`Données récupérées avec succès: ${listUsers}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route POST pour ajouter une nouvelle catégorie
router.post("/add", register);

// // Route PUT pour modifier les données d'une catégorie
// router.put('/etudiants/edit/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         console.log('Données de mise à jour reçues :', updatedData);
//         const editedEtudiant = await Etudiant.findByIdAndUpdate(id, updatedData, { new: true });
//         console.log('catégorie modifiée avec succès :', editedEtudiant);
//         res.status(200).json(editedEtudiant);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Route DELETE pour supprimer une catégorie
// router.delete('/etudiants/delete/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const deletedEtudiant = await Etudiant.findByIdAndDelete(id);
//         console.log('catégorie supprimé avec succès :', deletedEtudiant);
//         res.status(200).json(deletedEtudiant);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
module.exports = router;
