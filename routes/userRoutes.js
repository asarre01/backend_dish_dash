const router = require("express").Router();
const User = require("../models/User");
const { register, login, logout } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/authMiddlewares");

router.get("/", async (req, res) => {
    try {
        const listUsers = await User.find();
        res.json(listUsers);
        console.log(`Données récupérées avec succès: ${listUsers}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/add", register);

router.post("/login", login);
router.post("/logout", verifyToken, logout);
module.exports = router;
