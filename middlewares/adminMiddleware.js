// Middleware pour vérifier si l'utilisateur est un administrateur
const isAdminMiddleware = (req, res, next) => {
    // Vérifier si l'utilisateur n'est pas un administrateur
    if (!req.user.isAdmin) {
        // Retourner une réponse avec un code d'erreur 403 si l'accès est interdit
        return res.status(403).json({
            message:
                "Accès interdit. Seuls les administrateurs peuvent effectuer cette opération.",
        });
    }

    // Si l'utilisateur est un administrateur, passer au middleware suivant
    next();
};

// Exporter la fonction du middleware
module.exports = isAdminMiddleware;
