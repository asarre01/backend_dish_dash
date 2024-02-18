// Importer les bibliothèques nécessaires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const server = express();
const helmet = require("helmet");
const { v4: uuidv4 } = require('uuid');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const categorieRoutes = require("./routes/categorieRoutes");
const userRoutes = require("./routes/userRoutes");

// Charger les variables d'environnement depuis le fichier .env dans le dossier config
dotenv.config({ path: path.join(__dirname, "config", ".env") });

// Stocker le port du serveur dans une variable
const port = process.env.PORT;

// Stocker l'URI de la base de données MongoDB Atlas dans une variable
const urlDatabase = process.env.MONGO_URI;

server.use(express.json());
server.use(helmet());
server.use(cookieParser());

server.use(
    session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
        genid: function (req) {
            return uuidv4(); 
        },
    })
);



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
