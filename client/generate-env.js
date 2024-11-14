const fs = require('fs');
const path = './src/environments';

// Verifica si la carpeta `environments` existe, si no existe la crea
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
}

// Variables de entorno
const API_URL = process.env.API_URL;
const PRODUCTION = process.env.PRODUCTION === 'true';
const DARK_LAYER = process.env.DARK_LAYER;
const HILL_SHADE_LAYER = process.env.HILL_SHADE_LAYER;
const OPEN_STREET_MAP = process.env.OPEN_STREET_MAP;
const OPEN_STREET_MAP_HOT = process.env.OPEN_STREET_MAP_HOT;
const GRID_MAP = process.env.GRID_MAP;
const CLOUDINARY_API_URL = process.env.CLOUDINARY_API_URL;

// Config del archivo environment.ts para DEV
const devConfigFile = `
  export const environment = {
    PRODUCTION: false,
    API_URL: 'http://localhost:5000',
    DARK_LAYER: '${DARK_LAYER}',
    HILL_SHADE_LAYER: '${HILL_SHADE_LAYER}',
    OPEN_STREET_MAP: '${OPEN_STREET_MAP}',
    OPEN_STREET_MAP_HOT: '${OPEN_STREET_MAP_HOT}',
    GRID_MAP: '${GRID_MAP}',
    CLOUDINARY_API_URL: '${CLOUDINARY_API_URL}'
  };
`;

// Config del archivo environment.prod.ts para PRO
const prodConfigFile = `
  export const environment = {
    PRODUCTION: ${PRODUCTION},
    API_URL: '${API_URL}',
    DARK_LAYER: '${DARK_LAYER}',
    HILL_SHADE_LAYER: '${HILL_SHADE_LAYER}',
    OPEN_STREET_MAP: '${OPEN_STREET_MAP}',
    OPEN_STREET_MAP_HOT: '${OPEN_STREET_MAP_HOT}',
    GRID_MAP: '${GRID_MAP}',
    CLOUDINARY_API_URL: '${CLOUDINARY_API_URL}'
  };
`;

// Crear ambos archivos environment.ts y environment.prod.ts
fs.writeFileSync('./src/environments/environment.ts', devConfigFile);
fs.writeFileSync('./src/environments/environment.prod.ts', prodConfigFile);

console.log('Environment files generated successfully');