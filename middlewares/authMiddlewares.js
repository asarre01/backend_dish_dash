const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");
        console.log(token);
        if (!token) {
            return res.status(403).send("Accès refusé");
        }

        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "Erreur serveur" });
    }
};

module.exports = { verifyToken };
