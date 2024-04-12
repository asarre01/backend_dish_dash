const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Définition du schéma pour un plat
const platSchema = new Schema(
    {
        nom: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        categorieId: {
            type: Schema.Types.ObjectId,
            ref: "Categorie", // Référence au modèle Categorie
            required: true,
        },
        prix: {
            type: Number,
            required: true,
        },
        cheminImg: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

// Création du modèle Plat basé sur le schéma
const Plat = model("Plat", platSchema);

// Export du modèle Plat
module.exports = Plat;
