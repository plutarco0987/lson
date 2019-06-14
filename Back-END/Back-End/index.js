
//requerimientos
const Express=require('express');
const app=Express();
const Morgan= require('morgan');
const cors=require('cors');
const passport=require('passport');
const session =require('express-session');
const fileUpload = require('express-fileupload');


//Configuraciones
app.set('port',process.env.PORT || 3000);
app.set('photos', __dirname + '/public/photos');

//Middlewares
app.use(Morgan('dev'));
require('./BaseDatos');
app.use(Express.json());
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}));
app.use(fileUpload());

//app.use(cookieParser())

app.use(session({
    name:'myname.sid',
    resave:false,
    saveUninitialized:false,
    secret:'mysecret',
    cookie:{
        maxAge:36000000,
        httpOnly:false,
        secure:false
    }
}));

require('./passport-config');

app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use('/Biblioteca/',require('./Routes/BibliotecaLibros'));
app.use('/Cliente/',require('./Routes/ClienteLibros'));
app.use('/',require('./Routes/users'));
//puerto
app.listen(app.get('port'),()=>{
    console.log("Servidor corriendo en puerto ",app.get('port'))
});