const mongoose = require('mongoose');

const {Schema} = mongoose;

const biblioteca=new Schema({
    nombre:String,
    direccion:String,
    ciudad:String,
    telefono:String,
    poster:String,
    idUsuario:String    
});

module.exports = mongoose.model('Biblioteca',biblioteca);