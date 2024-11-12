const fs = require('fs');
const path = './src/environments';

// Verifica si la carpeta `environments` existe; si no, créala.
if (!fs.existsSync(path)) {
  fs.mkdirSync(path, { recursive: true });
}

const API_URL = process.env.API_URL || 'https://securoservapp.onrender.com/';
const PRODUCTION = process.env.PRODUCTION === 'true';
const DARK_LAYER = process.env.DARK_LAYER;
const HILL_SHADE_LAYER = process.env.HILL_SHADE_LAYER;
const CLOUDINARY_API_URL = process.env.CLOUDINARY_API_URL;

// Configuración del archivo environment.ts para desarrollo
const devConfigFile = `
  export const environment = {
    PRODUCTION: false,
    API_URL: 'http://localhost:5000',
    url: 'http://localhost:5000',
    DARK_LAYER: '${DARK_LAYER}',
    HILL_SHADE_LAYER: '${HILL_SHADE_LAYER}',
    CLOUDINARY_API_URL: '${CLOUDINARY_API_URL}'
  };
`;

// Configuración del archivo environment.prod.ts para producción
const prodConfigFile = `
  export const environment = {
    PRODUCTION: ${PRODUCTION},
    API_URL: '${API_URL}',
    DARK_LAYER: '${DARK_LAYER}',
    HILL_SHADE_LAYER: '${HILL_SHADE_LAYER}',
    CLOUDINARY_API_URL: '${CLOUDINARY_API_URL}'
  };
`;

// Crear ambos archivos environment.ts y environment.prod.ts
fs.writeFileSync('./src/environments/environment.ts', devConfigFile);
fs.writeFileSync('./src/environments/environment.prod.ts', prodConfigFile);

console.log('Environment files generated successfully');