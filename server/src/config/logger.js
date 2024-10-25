const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(), // Log en la consola
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Crear Log de errores
        new transports.File({ filename: 'logs/combined.log' }) // Crear Log general
    ]
});

module.exports = logger;