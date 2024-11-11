const { Schema, model } = require('mongoose');

const almacenSchema = new Schema({
    name: String,
    image: String,
    lat: Number,
    long: Number,
    ubicacion: String,
    size: String,
    tipo: String,
    capacidadMax: Number,
    existencias: Number,
    valor: Number,
    comprado: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El Almacen debe estar asignado a un usuario']
    }
},
    { collection: 'warehouses' },
    { timestamps: true }
);

module.exports = model('Almacen', almacenSchema);