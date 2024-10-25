require('dotenv').config();
require('./config/connection');

const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
const corsOptions = {
    optionsSuccessStatus: 200,
    origin: process.env.CLIENT_URL
}

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.get('/', (request, response) => {
    response.send('Welcome to SecuroServ');
});

// Login
app.post('/login', require('./route/authRoutes.js'));

// Users
app.post('/register', require('./route/authRoutes'));

const PORT = process.env.PORT || 4000;

const main = () => {
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
};

main();