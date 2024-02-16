const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const platSchema = new Schema({
    nom: {
        type: String,
        required: true,
        unique :true
    },
    description: {
        type: String,
        required: true,
    },
    categorie: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    }
});

const Plat = model("Plat", platSchema);

model.exports = Plat;