const Plat = require("../models/Plat");
const Categorie = require("../models/Categorie");
const fs = require("fs-extra");

exports.getAll = async (req, res) => {
    try {
        const listPlats = await Plat.find();
        res.status(200).json(listPlats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPlatsByCategorie = async (req, res) => {
    try {
        // Récupérer l'identifiant de la catégorie depuis les paramètres de la requête
        const categorieId = req.params.categorieId;

        // Rechercher la catégorie dans la base de données par son identifiant
        const categorie = await Categorie.findById(categorieId);

        // Vérifier si la catégorie existe
        if (!categorie) {
            return res.status(404).json({ message: "Catégorie introuvable" });
        }

        // Récupérer tous les plats appartenant à cette catégorie en utilisant populate
        const plats = await Plat.find({ categorieId: categorieId }).populate({
            path: "categorieId",
        });

        // Répondre avec les plats et les informations de la catégorie en format JSON
        res.status(200).json(plats);
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

        res.status(201).json({ message: "Plat ajouté avec succés" });
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
