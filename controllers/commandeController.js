const Commande = require("../models/Commande");

exports.ajouterCommande = async (req, res) => {
    try {
        console.log(req.body);
        const { nom, prenom, tel, table, items } = req.body;
        const nouvelleCommande = new Commande({ nom, prenom, table,tel, items });
        await nouvelleCommande.save();
        res.status(201).json({
            message: "Commande ajoutée avec succès",
            commande: nouvelleCommande,
        });
    } catch (error) {
            console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.validerPaiement = async (req, res) => {
    try {
        const { commandeId } = req.params;
        const commande = await Commande.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        commande.paymentStatus = true;
        await commande.save();
        res.status(200).json({
            message: "Paiement validé avec succès",
            commande,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validerStatut = async (req, res) => {
    try {
        const { commandeId } = req.params;
        const commande = await Commande.findById(commandeId);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }
        commande.status = !commande.status;
        await commande.save();
        res.status(200).json({
            message: "Statut de commande mis à jour avec succès",
            commande,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find();
        res.status(200).json({ commandes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
