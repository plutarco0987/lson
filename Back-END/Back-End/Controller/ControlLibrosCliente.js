const Libros = require('../Models/Libros');
//const Biblioteca=require('../Modelos/Biblioteca');
const Generos = require('../Models/Generos');
const Biblioteca = require('../Models/Biblioteca');
const Clientes = require('../Models/Cliente');
const Ciudades = require('../Models/Ciudades');
const passport = require('passport');
const LibrosControlClientes = {};
const fs = require('fs');

//obtenemos todo para la pantalla principal
LibrosControlClientes.GetPrincipal = async (req, res, next) => {
    var contador = req.params.contador;
    var x = contador * 10;
    var xxx = x - 10;
    if (contador >= 1) {
        const libros = await Libros.find().limit(10).skip(xxx);
        console.log(libros);
        res.json(libros);
    }
    else {

    }

    res.json(libros);
};
LibrosControlClientes.GetImagenLibro = async (req, res, next) => {
    console.log("entro aqui");
    var url = "/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/" + req.params.foto;
    console.log(url);
    if (!fs.existsSync(url)) {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/NoDisponible.jpg").pipe(res);
    }
    else {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream(url).pipe(res);
    }

};
LibrosControlClientes.GetBibliotecasFoto = async (req, res, next) => {

    var url = "/Users/plutarco/Desktop/LSon/Back-End/imagenBibliotecas/" + req.params.foto;
    if (!fs.existsSync(url)) {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/NoDisponible.jpg").pipe(res);
    }
    else {
        res.writeHead(200, { 'content-type': 'image/jpg' });
        fs.createReadStream(url).pipe(res);
    }
};
LibrosControlClientes.CountLibros = async (req, res, next) => {

    const count = await Libros.count();
    console.log(count);
    res.json(count);
}
LibrosControlClientes.CountLibrosCategoria = async (req, res, next) => {
    var genero = req.params.genero;
    console.log(genero);
    var generomayusculas = genero.toUpperCase();
    console.log(generomayusculas);
    const count = await Libros.count({ genero: generomayusculas });
    console.log(count);
    res.json(count);
}
LibrosControlClientes.GetBibliotecas = async (req, res, next) => {
    //ya que este metodo solo se usara si estas logueado en el enrutamiento
    //se encuentra su validación, si este esta vacio se envia una nota
    console.log("llego!!!");
    const bibliotecas = await Biblioteca.find();
    if (bibliotecas != null) {
        res.json(bibliotecas);
    }
    else {
        res.json('No hay empresas')
    }
};
LibrosControlClientes.getGeneros = async (req, res) => {
    const generosasync = await Generos.find();
    console.log(generosasync)
    res.json(generosasync);
};
LibrosControlClientes.GetLibrosCategoria = async (req, res) => {
    var genero = req.params.genero;
    var generomayusculas = genero.toUpperCase();

    var contador = req.params.contador;
    var x = contador * 10;
    var xxx = x - 10;
    const librosgenero = await Libros.find({ genero: generomayusculas }).limit(10).skip(xxx);

    if (librosgenero == null) {
        res.json('No hay Libros de ese genero')
    }
    else {
        res.json(librosgenero);
    }
};
LibrosControlClientes.AgregaFavoritos = async (req, res) => {
    console.log("llego!!!!!")
    console.log(req.params);
    var idusuario = req.params.iduser;
    var idlibro = req.params.idlibro;
    const libro = await Libros.findOne({ _id: idlibro });


    if (libro != null) {
        const cliente1 = await Clientes.findOne({ idUsuario: idusuario });
        var resultado = false;
        if (Object(cliente1.favoritos).length != 0) {
            for (var i = 0; i < Object(cliente1.favoritos).length; i++) {
                console.log(cliente1.favoritos[i].titulo);
                if (cliente1.favoritos[i].titulo == libro.titulo) {
                    resultado = false;
                    break;
                }
                else {
                    resultado = true;
                }
            }

            if (resultado == false) {
                res.json('Ya tiene un libro igual');
            }
            else {
                cliente1.favoritos.push(libro);
                cliente1.save();
                console.log("entro3");
                res.json('Se a agregado a favoritos');
            }
        }
        else {
            await cliente1.favoritos.push(libro);
            await cliente1.save();
            res.json('Se a agregado a favoritos1');
            console.log("entro1");
            resultado = true;
        }
    }
    else {
        res.json('No es un usario4');
    }
}
LibrosControlClientes.AgregaPorLeer = async (req, res) => {

    console.log("llego a por leer")
    console.log(req.params);
    var idusuario = req.params.iduser;
    var idlibro = req.params.idlibro;
    const libro = await Libros.findOne({ _id: idlibro });


    if (libro != null) {
        const cliente1 = await Clientes.findOne({ idUsuario: idusuario });
        var resultado = false;
        if (Object(cliente1.vistos).length != 0) {
            for (var i = 0; i < Object(cliente1.vistos).length; i++) {
                console.log(cliente1.vistos[i].titulo);
                if (cliente1.vistos[i].titulo == libro.titulo) {
                    resultado = false;
                    break;
                }
                else {
                    resultado = true;
                }
            }

            if (resultado == false) {
                res.json('Ya tiene un libro igual');
            }
            else {
                cliente1.vistos.push(libro);
                cliente1.save();
                console.log("entro3");
                res.json('Se a agregado a vistos');
            }
        }
        else {
            var estado = false;
            if (Object(cliente1.leidos).length > 0) {
                for (var i = 0; i < Object(cliente1.leidos).length; i++) {
                    //console.log(cliente1.leidos[i].titulo);
                    if (cliente1.leidos[i].titulo == libro.titulo) {
                        estado = true;
                        break;
                    }
                }
                if (estado == false) {
                    cliente1.vistos.push(libro);
                    cliente1.save();
                    res.json('Se a agregado a Por Leer');
                    console.log("entro");
                    resultado = true;
                }
                else {
                    res.json('Ya leyo ese libro');
                }
            }
            else {
                cliente1.vistos.push(libro);
                cliente1.save();
                res.json('Se a agregado a Por Leer');
                console.log("entro");
                resultado = true;
            }

        }
    }
    else {
        res.json('No es un usario');
    }
}
LibrosControlClientes.AgregaLeidos = async (req, res) => {
    console.log("llego a leidos")
    console.log(req.params);
    var idusuario = req.params.iduser;
    var idlibro = req.params.idlibro;
    const libro = await Libros.findOne({ _id: idlibro });


    if (libro != null) {
        const cliente1 = await Clientes.findOne({ idUsuario: idusuario });
        var resultado = false;
        if (Object(cliente1.leidos).length != 0) {
            for (var i = 0; i < Object(cliente1.leidos).length; i++) {
                console.log(cliente1.leidos[i].titulo);
                if (cliente1.leidos[i].titulo == libro.titulo) {
                    resultado = false;
                    break;
                }
                else {
                    resultado = true;
                }
            }

            if (resultado == false) {
                res.json('Ya tiene un libro igual leido');
            }
            else {
                cliente1.leidos.push(libro);
                cliente1.save();


                //recorremos los que estan por leer
                var estado = false;
                for (var i = 0; i < Object(cliente1.vistos).length; i++) {
                    if (cliente1.vistos[i].titulo == libro.titulo) {
                        cliente1.vistos.pull(libro);
                        cliente1.save();
                        break;
                    }
                }
                if (estado = true) {
                    res.json('Se movio su libro a leidos');
                }
                else {
                    res.json('Se a agregado a Leido');
                }
            }
        }
        else {
            cliente1.leidos.push(libro);
            cliente1.save();


            //recorremos los que estan por leer
            var estado = false;
            for (var i = 0; i < Object(cliente1.vistos).length; i++) {
                if (cliente1.vistos[i].titulo == libro.titulo) {
                    cliente1.vistos.pull(libro);
                    cliente1.save();
                    break;
                }
            }
            if (estado = true) {
                res.json('Se movio su libro a leidos');
            }
            else {
                res.json('Se a agregado a Leido');
            }
            console.log("entro");
        }
    }
    else {
        res.json('No es un usario');
    }
}
LibrosControlClientes.GetFavoritos = async (req, res) => {
    const cliente1 = await Clientes.findOne({ idUsuario: req.user._id });
    //console.log(cliente1.favoritos);
    res.json(cliente1.favoritos);
};
LibrosControlClientes.GetPorLeer = async (req, res) => {
    const cliente1 = await Clientes.findOne({ idUsuario: req.user._id });
    //console.log(cliente1.favoritos);
    res.json(cliente1.vistos);
};
LibrosControlClientes.GetLeidos = async (req, res) => {
    const cliente1 = await Clientes.findOne({ idUsuario: req.user._id });
    //console.log(cliente1.favoritos);
    res.json(cliente1.leidos);
};




LibrosControlClientes.EliminarLibreria = async (req, res) => {
    const cliente1 = await Clientes.findOne({ idUsuario: req.user._id });
    var idlibro = req.params.idlibro;
    var categoria = req.params.Categoria;
    console.log(cliente1);

    if (categoria == 'FAVORITOS') {
        if (Object(cliente1.favoritos).length > 0) {
            for (var i = 0; i < Object(cliente1.favoritos).length; i++) {
                console.log(cliente1.favoritos[i]._id);
                if (cliente1.favoritos[i]._id == idlibro) {
                    cliente1.favoritos.pull(idlibro);
                    cliente1.save();
                    break;
                }
            }
            return res.json('Se elimino de favoritos');
        }
    }
    if (categoria == 'PORLEER') {
        if (Object(cliente1.vistos).length > 0) {
            for (var i = 0; i < Object(cliente1.vistos).length; i++) {
                if (cliente1.vistos[i]._id == idlibro) {
                    cliente1.vistos.pull(idlibro);
                    cliente1.save();
                    break;
                }
            }
            return res.json('Se elimino de por leer');
        }
    }
    if (categoria == 'LEIDOS') {
        if (Object(cliente1.leidos).length > 0) {
            for (var i = 0; i < Object(cliente1.leidos).length; i++) {
                if (cliente1.leidos[i]._id == idlibro) {
                    cliente1.leidos.pull(idlibro);
                    cliente1.save();
                    break;
                }
            }
            return res.json('Se elimino de leidos');
        }
    }

};
LibrosControlClientes.GetLibrosBiblioteca = async (req, res) => {
    //metodo que regresa los libros de una biblioteca
    var idbiblioteca = req.params.idbiblioteca;
    var contador = req.params.contador;
    var x = contador * 10;
    var xxx = x - 10;
    //regresa todos los libros de esa biblioteca
    if (contador >= 1) {
        const libros = await Libros.find({ bibliotecas: idbiblioteca }).limit(10).skip(xxx);
        console.log(libros);
        res.json(libros);
    }
    else {

    }
}
LibrosControlClientes.GetBiblioteca = async (req, res) => {
    console.log("llego!!!");
    var idbiblioteca = req.params.idbiblioteca;
    const bibliotecas = await Biblioteca.findOne({ _id: idbiblioteca });
    if (bibliotecas != null) {
        res.json(bibliotecas);
    }
    else {
        res.json('No hay empresas')
    }
}
LibrosControlClientes.BibliotecasNombres = async (req, res) => {
    var idlibro = req.params.idlibro;
    const libro = await Libros.findOne({ _id: idlibro });
    var librosids = libro.bibliotecas;
    var arraynombres = new Array();
    const x = await Biblioteca.find();

    console.log(Object(x).length);
    for (var i = 0; i < Object(x).length; i++) {
        for (var j = 0; j < Object(librosids).length; j++) {
            if (x[i]._id == librosids[j]) {
                arraynombres.push(x[i].nombre);
                break;
            }
        }
    }
    console.log(arraynombres);
    res.json(arraynombres)
}
LibrosControlClientes.Busqueda = async (req, res) => {
    //Busqueda/'+abuscar
    var titulooautor = req.params.abuscar;
    console.log(titulooautor);
    var mayuscular = titulooautor.toUpperCase();
    //buscamos por autor primeroporque si se encuentra sera mas facil y rapido
    var autor = false;
    //trae los libros con el autor que contenga lo que tenga, en front-ent va la limitacion... mas de 4    
    const librosautor = await Libros.find({ autor: { '$regex': mayuscular } });
    const librostitulo = await Libros.find({ titulo: { '$regex': mayuscular } });
    var xxx = librosautor.concat(librostitulo);


    var hash = {};
    xxx = xxx.filter(function (current) {
        var exists = !hash[current._id] || false;
        hash[current._id] = true;
        return exists;
    });

    console.log(xxx);
    //console.log(xxx);
    res.json(xxx);

};
module.exports = LibrosControlClientes;