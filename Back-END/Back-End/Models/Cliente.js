const mongoose = require('mongoose');
//const Libros=require('./Libros');
const {Schema} = mongoose;
const libros=new Schema({
    id:String,
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

const cliente=new Schema({
    nombre:{type:String},
    idUsuario:{type:String},
    favoritos:{
        type:[libros]
    },
    vistos:{
        type:[libros]
    },
    leidos:{
        type:[libros]
    },    
});
module.exports = mongoose.model('Clientes',cliente);