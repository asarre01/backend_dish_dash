const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorieSchema = new Schema({
    nom: {
        type: String,
        required: true,
        unique :true
    },
    description: {
        type: String,
        required: true,
    }
});

const categorie = model("categorie", categorieSchema);

model.exports = categorie;