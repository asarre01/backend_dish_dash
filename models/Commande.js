const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commandeSchema = new Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        prenom: {
            type: String,
            required: true,
        },
        tel: {
            type: String,
            required: true,
        },
        table: {
            type: String,
            required: true,
            default: "1",
        },
        items: {
            type: Array,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        paymentStatus: {
            type: Boolean,
            default: false,
        },
    }, 
    {
        timestamps: true,
    }
);

const Commande = model("Commande", commandeSchema);

module.exports = Commande;
