const mongoose = require('mongoose');

const {Schema} = mongoose;

const ciudades=new Schema({
    Ciudades:String
});

module.exports = mongoose.model('Ciudades',ciudades);