const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorieSchema = new Schema({
    nom: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Categorie = model("Categorie", categorieSchema);

module.exports = Categorie;
