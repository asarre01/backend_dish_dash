const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
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
    },
    password: {
        type: String,
        required: true,
    },
    commandes: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = model("User", userSchema);

module.exports = User;