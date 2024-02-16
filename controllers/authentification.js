const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
    try {
        const { prenom, nom, tel, email, password, isAdmin } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            prenom,
            nom,
            tel,
            email,
            password: passwordHash,
            isAdmin,
        });
        const addUser = await newUser.save();
        console.log("User enregistré avec succès :", addUser);
        res.status(201).json(addUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register };
