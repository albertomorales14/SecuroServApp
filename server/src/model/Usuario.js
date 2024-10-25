const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},
    { collection: 'users' },
    { timestamps: true }
);

module.exports = model('Usuario', usuarioSchema);