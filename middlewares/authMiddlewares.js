const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour vérifier le token
const verifyToken = async (req, res, next) => {
    try {
        // Récupérer le token depuis les cookies
        let token = req.cookies.token;

        // Vérifier si le token est présent
        if (!token) {
            return res.status(403).send("Accès refusé");
        }

        // Si le token commence par "Bearer", le nettoyer
        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
        }

        // Vérifier la validité du token en utilisant la clé secrète
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer les informations de l'utilisateur depuis la base de données
        const user = await User.findById(verified.id)
            .select("-password") // Exclure le mot de passe de la réponse
            .lean(); // Récupérer les données sous forme d'objet simple

        // Stocker les informations de l'utilisateur dans la requête
        req.user = user;

        // Passer au middleware suivant
        next();
    } catch (error) {
        // En cas d'erreur, renvoyer une réponse avec un code d'erreur 500
        return res.status(500).json({ msg: "Erreur serveur" });
    }
};

// Exporter la fonction du middleware
module.exports = { verifyToken };
