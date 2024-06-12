// Importer le modèle de catégorie
const Categorie = require("../models/Categorie");

// Fonction pour récupérer toutes les catégories
exports.getAll = async (req, res) => {
    try {
        // Recherche de toutes les catégories dans la base de données
        const listCategories = await Categorie.find();

        // Répondre avec les catégories récupérées en format JSON et le statut 200 (OK)
        res.status(200).json(listCategories);
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour récupérer une catégorie spécifique par son identifiant
exports.getOne = async (req, res) => {
    try {
        // Récupérer l'identifiant de la catégorie depuis les paramètres de la requête
        const categoryId = req.params.id;

        // Recherche de la catégorie dans la base de données par son identifiant
        const category = await Categorie.findById(categoryId);

        // Vérifier si la catégorie a été trouvée
        if (!category) {
            return res.status(404).json({ msg: "Catégorie introuvable" });
        }

        // Répondre avec la catégorie récupérée en format JSON
        res.json({ msg: `Catégorie récupérée avec succès: ${category}` });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour ajouter une nouvelle catégorie
exports.addCategorie = async (req, res) => {
    try {
        // Vérifier si une catégorie avec le même nom existe déjà
        const existingCategorie = await Categorie.findOne({
            nom: req.body.nom,
        });

        // Si une catégorie avec le même nom existe déjà, renvoyer une erreur
        if (existingCategorie) {
            return res
                .status(400)
                .json({ message: "Une catégorie avec ce nom existe déjà" });
        }

        // Créer une nouvelle instance de catégorie avec les données du corps de la requête
        const addCategorieData = new Categorie(req.body);

        // Enregistrer la nouvelle catégorie dans la base de données
        const addCategorie = await addCategorieData.save();

        // Afficher un message de succès et répondre avec la catégorie ajoutée en format JSON
        console.log("Catégorie enregistrée avec succès :", addCategorieData);
        res.status(201).json({ message: "Catégorie ajoutée avec succés !" });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour modifier les données d'une catégorie
exports.editCategorie = async (req, res) => {
    try {
        // Récupérer l'identifiant de la catégorie depuis les paramètres de la requête
        const id = req.params.id;

        // Récupérer les données mises à jour depuis le corps de la requête
        const updatedData = req.body;

        // Afficher les données de mise à jour reçues dans la console
        console.log("Données de mise à jour reçues :", updatedData);

        // Rechercher et mettre à jour la catégorie dans la base de données
        const editedCategorie = await Categorie.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        // Afficher un message de succès et répondre avec la catégorie modifiée en format JSON
        console.log("Catégorie modifiée avec succès :", editedCategorie);
        res.status(200).json(editedCategorie);
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour supprimer une catégorie par son identifiant
exports.deleteCategorie = async (req, res) => {
    try {
        // Récupérer l'identifiant de la catégorie depuis les paramètres de la requête
        const id = req.params.id;

        // Rechercher et supprimer la catégorie dans la base de données par son identifiant
        const deletedCategorie = await Categorie.findByIdAndDelete(id);

        // Afficher un message de succès et répondre avec la catégorie supprimée en format JSON
        console.log("Catégorie supprimée avec succès :", deletedCategorie);
        res.status(200).json(deletedCategorie);
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};
