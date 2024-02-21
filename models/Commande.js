const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commandeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                platId: {
                    type: Schema.Types.ObjectId,
                    ref: "Plat",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
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
