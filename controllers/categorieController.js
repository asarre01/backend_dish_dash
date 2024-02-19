const Categorie = require("../models/Categorie");

exports.getAll = async (req, res) => {
    try {
        const listCategories = await Categorie.find();
        res.json({ msg: `Données récupérées avec succès: ${listCategories}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addCategorie =  async (req, res) => {
    try {
        const addCategorieData = new Categorie(req.body);
        const addCategorie = await addCategorieData.save();
        console.log("Catégorie enregistrée avec succès :", addCategorieData);
        res.status(201).json(addCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editCategorie = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        console.log('Données de mise à jour reçues :', updatedData);
        const editedCategorie = await Categorie.findByIdAndUpdate(id, updatedData, { new: true });
        console.log('catégorie modifiée avec succès :', editedCategorie);
        res.status(200).json(editedCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategorie = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCategorie = await Categorie.findByIdAndDelete(id);
        console.log('catégorie supprimé avec succès :', deletedCategorie);
        res.status(200).json(deletedCategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};