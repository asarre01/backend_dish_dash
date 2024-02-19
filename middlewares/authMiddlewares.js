const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        //let token = req.header("Authorization");
        let token = req.cookies.token;

        if (!token) {
            return res.status(403).send("Accès refusé");
        }

        if (token.startsWith("Bearer")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verified.id)
            .select("-password")
            .lean();

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ msg: "Erreur serveur" });
    }
};

module.exports = { verifyToken };
