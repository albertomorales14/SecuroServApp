const express = require('express');
const logger = require('../config/logger');
const router = express.Router();

router.post('/logs', (req, res) => {
    const { level, message, meta } = req.body;

    if (logger[level]) {
        logger[level](message, meta);
        res.status(200).send({ message: 'Log registrado correctamente' });
    } else {
        res.status(400).send({ message: 'Nivel de log inválido' });
    }
});

module.exports = router;