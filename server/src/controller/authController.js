const authController = {};

const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const logger = require('../config/logger');

// Crear nuevo usuario
authController.createUser = async (request, response) => {
    try {

        const hashedPassword = await hashPassword(request.body.password);
        const newUser = new Usuario({
            username: request.body.username,
            password: hashedPassword
        });

        // comprobar si existe el usuario
        const usuario = await Usuario.find({ username: newUser.username });
        if (usuario.length !== 0) {
            logger.warn('\t> createUser: El usuario ya existe (authController.js)');
            response.json({ message: 'El usuario ya existe' });
        } else {
            await newUser.save();
            response.json(newUser);
            logger.info('\t> createUser: Usuario creado con exito (authController.js)');
        }

    } catch (error) {
        logger.error('ERROR: createUser: Error al crear usuario (authController.js): ' + error);
    }
}


authController.login = async (request, response) => {
    try {

        const body = request.body;
        await Usuario.findOne({ username: body.username })
            .then(user => {
                if (user) {
                    comparePassword(body.password, user.password)
                        .then(isPasswordMatch => {
                            if (isPasswordMatch) {
                                const expiresIn = 24 * 60 * 60;
                                const accessToken = jwt.sign({ id: user._id },
                                    process.env.JWT_SECRET_KEY, {
                                    expiresIn: expiresIn,
                                });

                                logger.info('\t> Login: Acesso correcto (authController.js)');
                                logger.info('\t> Usuario conectado: ' + JSON.stringify(user.username) + ' (authController.js)');
                                
                                const result = {
                                    dataUser: {
                                        username: user.username,
                                        password: user.password,
                                        accessToken: accessToken,
                                        expiresIn: expiresIn
                                    }
                                }
                                response.json(result);
                            } else {
                                logger.warn("\t> Login: Contraseña incorrecta (authController.js)");
                                response.json({ message: "Contraseña incorrecta" });
                            }
                        });
                } else {
                    logger.warn('\t> Login: No existe el usuario (authController.js)');
                    response.json({ mesagge: 'No existe este usuario' });
                }
            });
    } catch (error) {
        logger.error('ERROR: Login: Error al iniciar sesión (authController.js): ' + error);
        throw new Error('ERROR: Login: Error al iniciar sesión (authController.js): ' + error);
    }
}

// Encriptar password
const hashPassword = async (password) => {
    try {
        const hash = await bcryptjs.hash(password, 10);
        return hash;
    } catch (error) {
        logger.error('\t> Error al hashear password (authController.js): ' + error);
        throw new Error('\t> Error al hashear password (authController.js): ' + error);
    }
};

// desencriptar password
const comparePassword = async (password, hash) => {
    try {
        const isMatch = await bcryptjs.compare(password, hash);
        return isMatch;
    } catch (error) {
        logger.error('\t> Error al verificar password (authController.js): ' + error);
        throw new Error('\t> Error al verificar password (authController.js): ' + error);
    }
};

module.exports = authController;