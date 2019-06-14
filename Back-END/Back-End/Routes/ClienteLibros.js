const Express=require('express');
const router=Express.Router();
const controlCliente=require('../Controller/ControlLibrosCliente');
const passport=require('passport');



//para la pantalla principal son 3 valores, (idbiblioteca,imagen,ciudad)

router.get('/Index/:contador',isValidUser,controlCliente.GetPrincipal);
////para la pantalla principal son 3 valores, (idbiblioteca,imagen,ciudad)
router.get('/Foto/:foto',isValidUser,controlCliente.GetImagenLibro);
router.get('/CountLibros',isValidUser,controlCliente.CountLibros);
router.get('/Bibliotecas',isValidUser,controlCliente.GetBibliotecas);
router.get('/Generos',isValidUser,controlCliente.getGeneros);
router.get('/FotoBiblioteca/:foto',isValidUser,controlCliente.GetBibliotecasFoto);
router.get('/LibrosGenero/:genero/:contador',isValidUser,controlCliente.GetLibrosCategoria);

router.get('/AgregaFavoritos/:iduser/:idlibro',isValidUser,controlCliente.AgregaFavoritos);
router.get('/AgregaPorLeer/:iduser/:idlibro',isValidUser,controlCliente.AgregaPorLeer);
router.get('/AgregaLeidos/:iduser/:idlibro',isValidUser,controlCliente.AgregaLeidos);
router.get('/Favoritos',isValidUser,controlCliente.GetFavoritos);
router.get('/PorLeer',isValidUser,controlCliente.GetPorLeer);
router.get('/Leidos',isValidUser,controlCliente.GetLeidos);
router.get('/Eliminar/:iduser/:idlibro/:Categoria',isValidUser,controlCliente.EliminarLibreria)
router.get('/CantidadLibrosGenero/:genero',isValidUser,controlCliente.CountLibrosCategoria);
router.get('/LibrosBiblioteca/:idbiblioteca/:contador',isValidUser,controlCliente.GetLibrosBiblioteca);
router.get('/Biblioteca/:idbiblioteca',isValidUser,controlCliente.GetBiblioteca);
router.get('/BibliotecasNombres/:idlibro',isValidUser,controlCliente.BibliotecasNombres);
router.get('/Busqueda/:abuscar',isValidUser,controlCliente.Busqueda);
function isValidUser(req,res,next){
    //console.log(req);
    if(req.isAuthenticated()) next();
    else return res.status(402).json({message:'peticion invalida'})
}

module.exports = router;