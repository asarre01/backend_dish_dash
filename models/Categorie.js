// Importer les modules nécessaires
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Définir le schéma de la catégorie
const categorieSchema = new Schema(
    {
        // Champ pour le nom de la catégorie
        nom: {
            type: String,
            required: true,
            unique: true,
        },
        // Champ pour la description de la catégorie
        description: {
            type: String,
            required: true,
        },

        cheminCat: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
); // Ajouter l'option timestamps: true pour les horodatages automatiques

// Créer le modèle de la catégorie à partir du schéma
const Categorie = model("Categorie", categorieSchema);

// Exporter le modèle pour l'utiliser dans d'autres fichiers
module.exports = Categorie;
