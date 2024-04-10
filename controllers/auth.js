// Importer les bibliothèques nécessaires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
    try {
        // Extraire les données du corps de la requête
        const { prenom, nom, tel, email, password, isAdmin } = req.body;

        // Vérifier si l'email ou le numéro de téléphone existe déjà
        const existingUser = await User.findOne({ $or: [{ email }, { tel }] });
        if (existingUser) {
            return res.status(400).json({
                message: "L'email ou le numéro de téléphone existe déjà !",
            });
        }

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
            cheminAvatar: "",
            isAdmin,
        });

        // Enregistrer le nouvel utilisateur dans la base de données
        const addUser = await newUser.save();

        // Répondre avec un code 201 (Créé) et un message de succès
        res.status(201).json({
            message: `Cet utilisateur a été ajouté avec succès!`,
        });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

// Fonction pour la connexion d'un utilisateur existant
const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        // Recherche de l'utilisateur par email ou téléphone
        let userLogin = await User.findOne({
            $or: [{ email: login }, { tel: login }],
        });

        // Vérifier si l'utilisateur existe
        if (!userLogin) {
            return res
                .status(404)
                .json({ message: "Cet utilisateur n'existe pas!" });
        }

        // Vérifier si le mot de passe est correct
        const isSame = await bcrypt.compare(password, userLogin.password);

        if (!isSame) {
            return res.status(401).json({ message: "Mot de passe incorrect!" });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET);

        // Répondre avec un code 200 (OK) et un message de connexion réussie
        return res.status(200).json({
            profil: {
                _id: userLogin._id,
                prenom: userLogin.prenom,
                nom: userLogin.nom,
                tel: userLogin.tel,
                email: userLogin.email
            },
            isAdmin: userLogin.isAdmin,
            token: token,
        });
    } catch (error) {
        // En cas d'erreur, afficher l'erreur dans la console et répondre avec un code 500 (Erreur serveur)
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

// Exporter les fonctions pour les rendre disponibles pour d'autres fichiers
module.exports = { register, login };
