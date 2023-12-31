const express = require("express");
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware")
const { sign } = require("jsonwebtoken");

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("CREATION UTILISATEUR REUSSI");
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({where: { username: username } });

    if(!user) {
        res.json({error:"UTILISATEUR N'EXISTE PAS"});
    }
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error:"MAUVAIS MOT DE PASSE"});
        }

        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
          );
        res.json(accessToken);
    });
});


router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;