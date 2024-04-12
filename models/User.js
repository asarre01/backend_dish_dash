const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        prenom: {
            type: String,
            required: true,
        },
        nom: {
            type: String,
            required: true,
        },
        tel: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        cheminAvatar: {
            type: String,
            default: "",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
