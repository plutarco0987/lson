const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const {Schema} = mongoose;

const user=new Schema({
    email: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      role:{
          type:String,
          required:true
      },
      pass:{
        type:String,
        required:true
    },
      creation_dt:{type:Date,require:true}
});

user.statics.hashPassword=function hashPassword(pass){
  return bcrypt.hashSync(pass,10);
};
user.methods.isValid=function(hashPassword){
  return bcrypt.compareSync(hashPassword,this.pass);
};

module.exports = mongoose.model('User',user);