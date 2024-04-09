// Importer les bibliothèques nécessaires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const server = express(); // Changed `app` to `server`
const cors = require("cors");
const categorieRoutes = require("./routes/categorieRoutes");
const userRoutes = require("./routes/userRoutes");
const platRoutes = require("./routes/platRoutes");
const { verifyToken } = require("./middlewares/authMiddlewares");

// Charger les variables d'environnement depuis le fichier .env dans le dossier config
dotenv.config({ path: path.join(__dirname, "config", ".env") });

// Stocker le port du serveur dans une variable
const port = process.env.PORT;

// Stocker l'URI de la base de données MongoDB Atlas dans une variable
const urlDatabase = process.env.MONGO_URI;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
server.use(cors(corsOptions)); 

// Se connecter à la base de données en utilisant mongoose
mongoose
    .connect(urlDatabase)
    .then(() => {
        console.log("La base de données a été connectée avec succès.");

        // Démarrer le serveur express
        server.listen(port, () => {
            console.log(
                `Le serveur est en cours d'exécution sur le port ${port}`
            );
        });
    })
    .catch((err) => {
        console.error(
            `Erreur lors de la connexion à la base de données : ${err}`
        );
    });

// Routes
server.use("/users", userRoutes);
server.use("/categories", verifyToken, categorieRoutes);
server.use("/plats", verifyToken, platRoutes);
