const Express=require('express');
const router=Express.Router();
const controlLibros=require('../Controller/ControlLibrosBiblioteca');
const passport=require('passport');

//const multer =require('multer');
//const uploadLibros=multer({dest:'./ImagenesLibros'});

//router.get('/Home',controlLibros.getEmpresa);

//consulta todos los libros
router.get('/Libros/:contador',isValidUser,controlLibros.getLibros);
//agrega un libro
router.post('/Libro/:iduser',controlLibros.setLibro);
//obtiene un libro en espesifico con su nombre en toda la base dede datos
router.get('/Libros/ConsultaNombre/:nombre',isValidUser,controlLibros.getLibro);
//elimina un libro correspondiente
router.delete('/Libros/:_id/:iduser',controlLibros.deleteLibro);
//traer genero
router.get('/Generos',isValidUser,controlLibros.getGeneros);
router.post('/Imagen/:iduser/:idlibro',controlLibros.postImagen);
router.get('/Perfil',isValidUser,controlLibros.getPerfil);
router.get('/Ciudades/',isValidUser,controlLibros.getCiudades);
router.get('/Foto/:foto',controlLibros.getFoto);
router.get('/FotoLibro/:foto',controlLibros.getFotoLibro);
router.get('/AgregarLibro/:idlibro',isValidUser,controlLibros.setLibroID);
router.get('/CountLibros',isValidUser,controlLibros.GetcoutLibros);
router.post('/SetFoto/:iduser',controlLibros.PostFoto);
router.post('/PostPerfil/:iduser',controlLibros.PostPerfil);
router.post('/SetArchivo/:iduser',controlLibros.PostArchivo);
router.post("/AgregarLibrosMasivos/:iduser",controlLibros.AgregarLibrosMasivos);
router.post("/PostImagenNoExistente/:iduser/:idlibro",controlLibros.PostImagenNoExistente);
function isValidUser(req,res,next){
    //console.log(req);
    if(req.isAuthenticated()) next();
    else return res.status(402).json({message:'peticion invalida'})
}
module.exports=router;
