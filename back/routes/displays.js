const express = require("express");
const router = express.Router();
const { Displays } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get('/', async (req, res) => {
    const listOfDisplays = await Displays.findAll();
    res.json(listOfDisplays);
});

router.get('/byId/:id', async (req, res) => {
    const display = await Displays.findByPk(req.params.id);
    res.json(display);
});

router.post('/', validateToken, async (req, res) => {
    const display = await Displays.create(req.body);
    res.json(display);
});

router.delete('/:id', validateToken, async (req, res) => {
    const displayId = req.params.displayId;
    await Displays.destroy({
        where: {
            id: displayId,
        }
    });

    res.json("SUPPRIMER AVEC SUCCES");
});

module.exports = router;