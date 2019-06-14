const mongoose = require('mongoose');

const {Schema} = mongoose;

const libros=new Schema({
    titulo:String,
    autor:String,
    genero:String,
    sinopsis:String,
    editorial:String,
    anho:Number,
    numPaginas:Number,
    poster:String,
    //el id de las bibliotecas se almasenara en libros
    bibliotecas:{type: [String]},
});

module.exports = mongoose.model('Libros',libros);