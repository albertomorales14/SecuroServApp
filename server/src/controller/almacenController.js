const almacenController = {};

const mongoose = require("mongoose");
const AlmacenDTO = require('../model/Almacen');
const logger = require('../config/logger');

// Obtener los productos de un CLub
almacenController.getAlmacenesByUserId = async (request, response) => {
    try {
        const userId = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.error('\t> Error: getAlmacenesByUserId: Invalid user ID (almacenController.js)');
            return response.status(400).json({ message: 'Invalid user ID' });
        }

        const almacenes = await AlmacenDTO.find({ userId: userId });
        if (!almacenes || almacenes.length === 0) {
            logger.error('\t> Error: getAlmacenesByUserId: No se encontraron almacenes para este usuario (almacenController.js)');
            return response.status(404).json({ message: 'No se encontraron almacenes para este usuario' });
        }

        logger.info('\t> getAlmacenesByUserId: Todos los almacenes del usuario obtenidos (almacenController.js)');
        response.json(almacenes);
    } catch (error) {
        logger.error('\t> Error: getAlmacenesByUserId: obtener los almacenes del usuario (almacenController.js): ' + error);
        response.status(500).json({ message: 'Error al obtener los almacenes del usuario' });
    }
}

module.exports = almacenController;