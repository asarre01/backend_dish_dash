const Plat = require("../models/Plat");
const fs = require("fs-extra");

exports.getAll = async (req, res) => {
    try {
        const listPlats = await Plat.find();
        res.json({ msg: `Données récupérées avec succès: ${listPlats}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer une catégorie spécifique par son identifiant
exports.getOne = async (req, res) => {
    try {
        // Récupérer l'identifiant de la catégorie depuis les paramètres de la requête
        const platId = req.params.id;

        // Recherche de la catégorie dans la base de données par son identifiant
        const plat = await Categorie.findById(platId);

        // Vérifier si la catégorie a été trouvée
        if (!plat) {
            return res.status(404).json({ msg: "Catégorie introuvable" });
        }

        // Répondre avec la catégorie récupérée en format JSON
        res.json({ msg: `Catégorie récupérée avec succès: ${plat}` });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

exports.addPlat = async (req, res) => {
    try {
        const { nom, description, categorieId, prix } = req.body;
        const addPlatData = new Plat({
            nom,
            description,
            categorieId,
            prix,
            cheminImg: req.file.filename,
        });
        const addPlat = await addPlatData.save();

        console.log("Plat enregistré avec succès :", addPlat);
        res.status(201).json(addPlat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.editPlat = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        console.log("Données de mise à jour reçues :", updatedData);
        const editedPlat = await Plat.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        console.log("catégorie modifiée avec succès :", editedPlat);
        res.status(200).json(editedPlat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePlat = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPlat = await Plat.findByIdAndDelete(id);

        if (!deletedPlat) {
            return res.status(404).json({ message: "Plat non trouvé." });
        }

        const cheminImg = deletedPlat.cheminImg;

        if (cheminImg && deletedPlat) {
            deleteImage(cheminImg);
        }

        console.log("Plat supprimé avec succès :", deletedPlat);
        res.status(200).json(deletedPlat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteImage = async (id) => {
    try {
        const dir = `public/imgPlats/${id}`;
        await fs.remove(dir);
        console.log(`delete : ${dir}`);
    } catch (err) {
        console.error(err);
    }
};
