const mongoose = require('mongoose');

const {Schema} = mongoose;

const generos=new Schema({
    _id:String,
    genero:String
});

module.exports = mongoose.model('Generos',generos);