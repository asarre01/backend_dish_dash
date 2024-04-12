const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    let token;
    // Vérifie si le token est présent dans les en-têtes de la requête
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Récupère le token à partir de l'en-tête Authorization
            token = req.headers.authorization.split(" ")[1];
            // Vérifie la validité du token en utilisant la clé secrète
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Récupère les informations de l'utilisateur à partir de l'ID du token décodé
            req.user = await User.findById(decoded.id).select("-password");

            // Passe au middleware suivant
            next();
        } catch (error) {
            // En cas d'erreur lors de la vérification du token
            res.status(401);
            throw new Error(
                "Non autorisé, échec de l'authentification du token"
            );
        }
    } else {
        // En cas de token manquant dans les en-têtes de la requête
        res.status(401);
        throw new Error("Non autorisé, aucun token fourni");
    }
};

module.exports = { verifyToken };
