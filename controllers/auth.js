const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Fonction pour l'inscription d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        // Extraire les données du corps de la requête
        const { prenom, nom, tel, email, password, isAdmin } = req.body;

        // Générer un sel pour le hachage du mot de passe
        const salt = await bcrypt.genSalt();

        // Hacher le mot de passe avec le sel généré
        const passwordHash = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur avec les données hachées
        const newUser = new User({
            prenom,
            nom,
            tel,
            email,
            password: passwordHash,
            isAdmin,
        });

        // Enregistrer le nouvel utilisateur dans la base de données
        const addUser = await newUser.save();

        // Répondre avec un code 201 (Créé) et un message de succès
        res.status(201).json({
            msg: `Cet utilisateur ajouté avec succès : ${addUser}`,
        });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour la connexion d'un utilisateur existant
const login = async (req, res) => {
    try {
        const { email, tel, password } = req.body;

        let userLogin = await User.findOne({
            $or: [{ email: email }, { tel: tel }],
        });

        if (!userLogin) {
            return res
                .status(404)
                .json({ msg: "Cet utilisateur n'existe pas!" });
        }

        const isSame = await bcrypt.compare(password, userLogin.password);

        if (!isSame) {
            return res.status(401).json({ msg: "Mot de passe incorrect!" });
        }

        const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET);

        // Stockez les informations de la session et le token dans un cookie
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ msg: `Connexion réussie!` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erreur serveur" });
    }
};

const logout = (req, res) => {
    try {
        // Détruire la session côté serveur
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ msg: "Erreur serveur lors de la déconnexion" });
            }

            // Effacer le cookie de session côté client
            res.clearCookie("connect.sid");
            res.clearCookie("token");

            // Répondre avec un code 200 (OK) et un message de déconnexion réussie
            return res.status(200).json({ msg: "Déconnexion réussie" });
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ msg: "Erreur serveur lors de la déconnexion" });
    }
};

// Exporter les fonctions pour les rendre disponibles pour d'autres fichiers
module.exports = { register, login, logout };
