const express = require('express');
const router = express.Router();
const User = require('../Models/Users');
const passport = require('passport');
const controlLibros = require('../Controller/ControlLibrosBiblioteca');
const Clientes= require('../Models/Cliente');

router.post('/Registrar', function (req, res, next) {
    console.log(req.body);
    addtoDB(req, res)
});

async function addtoDB(req, res) {
    var user = new User({
        email: req.body.email,
        name: req.body.name,
        role: "Cliente",
        pass: User.hashPassword(req.body.pass),
        creation_dt: Date.now()
    })
    try {

        var x= await User.find({email:user.email});            
        console.log(x);
        if(x[0]!=null){
            console.log("entro aqui");
            return res.status(200).json('Ya esta registrado');
        }
        else{
            doc = await user.save();
            //al registrarlo debemos agregarlo como cliente y crearlo
            console.log("entro aqui tambien"); 
            
            //var suid=await User.find({email:user.email});          
            //var x=suid._id;
            //console.log(x);
            var cliente= new Clientes({
                nombre: user.name,
                idUsuario: user._id                
            });
            console.log(cliente);
            await cliente.save();
            //console.log(name);
            //console.log(suid._id);
            //console.log(user._id);
            console.log();
            //await Clientes.updateOne({nombre:name,idUsuario:'x'},{idUsuario:suid._id});
            return res.status(201).json(doc);
        }       
    }
    catch (err) {
        return res.status(501).json(err);
    }

    //Al 

}

router.post('/Login', function (req, res, next) {
    //console.log(req.body);    
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        //console.log(user);
        if (!user) { return res.status(502).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'login success' });
        });
    })(req, res, next);         
});



//para validar si esta logueado
router.get('/User', isValidUser, function (req, res, next) {
    //console.log(req.user);
    return res.status(200).json(req.user);
});
router.get('/Logout', isValidUser, function (req, res, next) {
    console.log("entro a logout");
    //console.log(req);
    req.logOut();
    return res.status(200).json({ message: "login correcto" });
});







function isValidUser(req, res, next) {
    //console.log(req);
    if (req.isAuthenticated()) next();
    else {
        return res.status(401).json({ message: 'peticion invalida' })
    }
}
module.exports = router;