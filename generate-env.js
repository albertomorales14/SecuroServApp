const fs = require('fs');

// Lee las variables de entorno desde Vercel
const API_URL = process.env.API_URL || 'https://securoservapp.onrender.com/';
const PRODUCTION = process.env.PRODUCTION === 'true';
const DARK_LAYER = process.env.DARK_LAYER;
const HILL_SHADE_LAYER = process.env.HILL_SHADE_LAYER;
const CLOUDINARY_API_URL = process.env.CLOUDINARY_API_URL;

// Define el contenido del archivo environment.prod.ts
const envConfigFile = `
  export const environment = {
    PRODUCTION: ${PRODUCTION},
    API_URL: '${API_URL}',
    DARK_LAYER: '${DARK_LAYER}',
    HILL_SHADE_LAYER: '${HILL_SHADE_LAYER}',
    CLOUDINARY_API_URL: '${CLOUDINARY_API_URL}'
  };
`;

// Crea el archivo environment.prod.ts en la carpeta src/environments
fs.writeFileSync('./client/src/environments/environment.prod.ts', envConfigFile);
console.log('Environment file generated successfully');