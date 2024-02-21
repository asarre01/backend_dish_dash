const User = require("../models/User");

exports.getAll = async (req, res) => {
    try {
        // Récupérer la liste des utilisateurs depuis la base de données (excluant le mot de passe)
        const listUsers = await User.find().select('-password');
        
        // Répondre avec la liste des utilisateurs en format JSON
        res.json({ msg: `Données récupérées avec succès: ${listUsers}` });
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

exports.getOne = async (req, res) => {
    try {
        // Récupérer l'identifiant de l'utilisateur depuis les paramètres de la requête
        const userId = req.params.id;

        // Recherche de l'utilisateur dans la base de données par son identifiant (excluant le mot de passe)
        const user = await User.findById(userId).select('-password');

        // Vérifier si l'utilisateur a été trouvé
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur introuvable" });
        }

        // Répondre avec l'utilisateur récupéré en format JSON
        res.json({ msg: `Utilisateur récupéré avec succès: ${user}` });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes

        if (res && res.status) {
            // Check if res is defined before using it
            res.status(500).json({ message: "Erreur serveur" });
        }
    }
};


exports.editUser = async (req, res) => {
    try {
        // Récupérer l'identifiant de l'utilisateur depuis les paramètres de la requête
        const id = req.params.id;
        
        // Récupérer les données mises à jour depuis le corps de la requête
        const updatedData = req.body;
        console.log("Données de mise à jour reçues :", updatedData);

        // Modifier l'utilisateur dans la base de données avec les données mises à jour
        const editedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        // Répondre avec l'utilisateur modifié en format JSON
        res.status(200).json(editedUser);
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        // Récupérer l'identifiant de l'utilisateur depuis les paramètres de la requête
        const id = req.params.id;

        // Supprimer l'utilisateur de la base de données par son identifiant
        const deletedUser = await User.findByIdAndDelete(id);

        // Répondre avec l'utilisateur supprimé en format JSON
        res.status(200).json(deletedUser);
    } catch (error) {
        // En cas d'erreur, répondre avec un code 500 (Erreur serveur) et un message d'erreur
        res.status(500).json({ message: error.message });
    }
};
