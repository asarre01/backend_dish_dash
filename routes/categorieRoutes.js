const router = require("express").Router();
const Categorie = require('../models/Categorie');
// Route GET pour récupérer la liste des catégories
router.get("/Categories/", async (req, res) => {
    try {
        const listCategories = await Categorie.find();
        res.json({msg : `Données récupérées avec succès: ${listCategories}`});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// // Route POST pour ajouter une nouvelle catégorie
// router.post('/etudiants/add', async (req, res) => {
//     try {
//         const addEtudiantData = new Etudiant(req.body);
//         const addEtudiant = await addEtudiantData.save();
//         console.log('catégorie enregistrée avec succès :', addEtudiant);
//         res.status(201).json(addEtudiant);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

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
