const mongoose=require('mongoose');
const URI="mongodb://localhost/LSONTesis";

mongoose.connect(URI, {useNewUrlParser: true}, (err)=>{
    if(err){
        console.error(err);
    }else{
        console.log('connected to mongo');
    }
});