const Libros = require('../Models/Libros');
//const Biblioteca=require('../Modelos/Biblioteca');
const GenerosEncuentra = require('../Models/Generos');
const Biblioteca = require('../Models/Biblioteca');
const Ciudades = require('../Models/Ciudades');
const passport = require('passport');
const LibrosControl = {};

const fs = require('fs');
const parse = require('csv-parse');


//COnsultar todos los libros
LibrosControl.getLibros = async (req, res, next) => {
    //id biblioteca se da cuando se inicia secion. esta en la sesion
    //var x = req.user._id;
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.user._id });
    //console.log(biblioteca);
    if (biblioteca == null) {
        res.status(401).send({ message: 'No es una biblioteca' })
    }
    else {
        //el numero que nos llegue (la pagina que se encuentre)
        var contador = req.params.contador;
        var x = contador * 10;
        const idBiblioteca = biblioteca._id;
        var xxx = x - 10;
        if (contador >= 1) {
            const libros = await Libros.find({ bibliotecas: idBiblioteca }).limit(10).skip(xxx);
            //console.log(libros);
            res.json(libros);
        }
        else {

        }
    }
}
LibrosControl.GetcoutLibros = async (req, res, next) => {
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.user._id });
    const count = await Libros.count({ bibliotecas: biblioteca._id });
    console.log(count);
    res.json(count);
};
//este sirve para agregar un libro que no existe en la base de datos
LibrosControl.setLibro = async (req, res, next) => {
    //la imagen correspondiente
    //id del libro despues la imagen

    //obtener el usuario que esta logueado
    //const usuarioencontrado= await Biblioteca.findById({"_id": req.session.passport.user});

    //console.log(req.body);
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });
    //console.log(biblioteca);


    //console.log(biblioteca);
    if (biblioteca == null) {
        res.status(401).send({ message: 'No es una bibliotecAAA' })
    }
    else {

        /**
         * Información
         */
        const usuarioencontrado = biblioteca._id;
        const libro = new Libros({
            titulo: req.body.titulo,
            autor: req.body.autor,
            genero: req.body.genero,
            sinopsis: req.body.sinopsis,
            editorial: req.body.editorial,
            anho: req.body.anho,
            poster: req.body.poster,
            numPaginas: req.body.numPaginas,
        }, { _id: false });
        //console.log(libro);
        //paso todas a mayusculas para no tener errores de busqueda
        libro.titulo = libro.titulo.toUpperCase();
        libro.autor = libro.autor.toUpperCase();
        libro.genero = libro.genero.toUpperCase();
        libro.editorial = libro.editorial.toUpperCase();
        //libro.poster= libro.poster.toUpperCase();
        //traigo todos
        //console.log(libro.titulo);
        const librostodos = await Libros.find({ titulo: libro.titulo });
        //console.log(librostodos);
        //console.log(librostodos);
        //si no lo encontro
        if (librostodos != null) {
            if (librostodos.length == 0) {
                libro.bibliotecas = usuarioencontrado;
                await libro.save();
                var x = await Libros.findOne({ titulo: libro.titulo });
                console.log(x);
                res.json(x);
            }
            else {
                //si existe el libro se eliminara la imagen para que esta pueda ser actualizada

                //recorro los que me traiga ya sea 1  (que es lo que espera)
                //console.log(Object(librostodos[0].bibliotecas).length);
                var entro = false;
                if (librostodos.length == 1) {

                    for (var i = 0; i < Object(librostodos[0].bibliotecas).length; i++) {
                        if (librostodos[0].bibliotecas[i] == usuarioencontrado) {
                            res.json('Ya tiene un libro registrado para su biblioteca');
                            entro = true;
                            break;
                        }
                    }
                    //no lo tiene
                    if (entro == false) {
                        //console.log(Libros.findById(librostodos._id));     
                        Libros.find({ titulo: libro.titulo })
                            .then((libro) => {
                                console.log('entro en esta parte')
                                libro[0].bibliotecas.push(usuarioencontrado);
                                libro[0].save();
                                res.json('El libro se encontraba en inventario, se a agregado a su biblioteca');
                            });
                    }
                }
                else {
                    res.json({ message: 'error' });
                }

            }

        }
        else {
            res.json({ status: "No hay Libros" });
        }



    }


}
//recupera un libro por titulo de la base de dato global
LibrosControl.getLibro = async (req, res) => {
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.user._id });
    console.log(biblioteca);
    if (biblioteca != null) {
        var titulolibroencontrado = req.params.nombre;
        //pasarlo a mayusculas
        console.log(titulolibroencontrado);
        titulolibroencontrado = titulolibroencontrado.toUpperCase();
        const libros = await Libros.find({ titulo: { '$regex': titulolibroencontrado } });

        console.log(libros);
        if (libros.length == 0) {
            res.json("No se encontro ningun libro con ese nombre");
        }
        else {
            res.json(libros);
        }
    }
    else {
        res.status(404).json('No es una biblioteca')
    }

};


//este agrega el libro que encuentre con el id correspondiente que llegue 
//en el parametro
LibrosControl.setLibroID = async (req, res) => {
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.user._id });
    console.log(biblioteca);
    if (biblioteca != null) {
        //obtenemos el id del parametro
        var id = req.params.idlibro;
        if (id != null) {
            const libroencontrado = await Libros.findOne({ _id: id });
            if (libroencontrado != null) {
                //verifico que la biblioteca no tenga ese libro ya si no sele envia un mensaje
                console.log(libroencontrado);
                //console.log(Object(libroencontrado.bibliotecas).length);
                var entro = false;
                for (var i = 0; i < Object(libroencontrado.bibliotecas).length; i++) {
                    if (libroencontrado.bibliotecas[i] == biblioteca._id) {
                        res.json('Ya tiene un libro');
                        entro = true;
                        break;
                    }
                }
                //significa que no lo tiene entonses sele agrega 
                if (entro == false) {
                    libroencontrado.bibliotecas.push(biblioteca._id);
                    libroencontrado.save();
                    res.json('Se a agregado a su inventario: ' + libroencontrado.titulo);
                }
            }
        }
        else {
            res.json('No hay un libro con ese id')
        }
    }
    else {
        res.json('No es una biblioteca');
    }
};
//elimina su registro del libro correspondiente.
LibrosControl.deleteLibro = async (req, res) => {
    //id del usuario biblioteca
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });

    if (biblioteca != null) {
        const idbiblioteca = biblioteca._id;
        //id del libro
        const idelimina = req.params._id;
        const libroencontrado = await Libros.findById({ _id: idelimina });
        console.log(libroencontrado);
        libroencontrado.bibliotecas.pull(idbiblioteca);
        libroencontrado.save();
        console.log("Entro a esta parte prro!!")
        res.json({ status: "Se elimino su libro" });
        if (libroencontrado.bibliotecas.length == 0) {
            console.log("esta vacio");
            //si este no tiene una imagen en el sistema
            var url = "/Users/plutarco/Desktop/LSon/Back-END/ImagenLibros/" + libroencontrado._id + "-" + libroencontrado.poster;

            console.log(url[url.length-1]);
            if (url[url.length-1] = " " || url[url.length-1] =="-") {
                await Libros.remove({ _id: libroencontrado._id });
                console.log("se elimino prro");
            }
            //si este tiene una imagen en el ssitema
            else {                
                fs.unlinkSync(url);
                await Libros.remove({ _id: libroencontrado._id });
                console.log("se elimino prro");
            }


        }
    }
    else {
        res.status(303).json('no es una biblioteca');
    }

};
LibrosControl.getGeneros = async (req, res) => {
    const generosasync = await GenerosEncuentra.find();
    console.log(generosasync)
    res.json(generosasync);
};
LibrosControl.getPerfil = async (req, res, next) => {
    //id de usuario
    var x = req.user._id;
    //var x= "5ca5475ad778c020dc2b3987";
    const encontrada = await Biblioteca.findOne({ idUsuario: x });

    res.json(encontrada);
}
LibrosControl.PostPerfil = async (req, res, next) => {

    const biblioteca = await Biblioteca.findOne({ _id: req.params.iduser });
    console.log(biblioteca);
    if (biblioteca != null) {
        var llegabiblioteca = new Biblioteca({
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            telefono: req.body.telefono,
        })
        console.log(llegabiblioteca);
        await Biblioteca.findOneAndUpdate({ _id: biblioteca._id }, {
            nombre: llegabiblioteca.nombre, direccion: llegabiblioteca.direccion
            , ciudad: llegabiblioteca.ciudad, telefono: llegabiblioteca.telefono
        });

        res.json('Se a actualizado su perfil');
    }
    else {
        res.json('no eres una biblioteca, no tienes acceso');
    }

};

LibrosControl.getCiudades = async (req, res) => {
    const ciudades = await Ciudades.find();
    console.log(ciudades);
    res.json(ciudades);
}

LibrosControl.postImagen = async (req, res, next) => {

    //console.log(req.files);
    //res.send(req.files.Myimagen.name);
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });

    if (biblioteca != null) {
        //var titulolibroencontrado = req.params.titulo;
        //console.log(titulolibroencontrado);
        //pasarlo a mayusculas
        //titulolibroencontrado = titulolibroencontrado.toUpperCase();

        //encontramos el libro que se agrego
        //const libros= await Libros.findOne({ titulo: req.params.idlibro });


        //console.log(libros);
        console.log(req.params.idlibro);
        if (req.params.idlibro != null) {
            let EDFile = req.files.Myimagen;
            var xx = req.params.idlibro;
            var aux = false;
            var url = '/Users/plutarco/Desktop/LSon/Back-END/ImagenLibros/' + xx + '-' + EDFile.name;
            console.log(url);
            fs.unlinkSync(url);
            fs.readFile(url,
                // callback function that is called when reading file is done
                function (err, data) {
                    if (err) {
                        //SI OCURRE UN ERROR SIGNIFICA QUE NO EXISTE
                        //var x = `idempresa/${EDFile.name}`;
                        //var s='./ImagenLibros/'+'IDEmpresa/'+EDFile.name;
                        EDFile.mv(`./ImagenLibros/${'' + xx + '-' + EDFile.name}`, err => {
                            if (err) return res.status(500).send({ message: err })

                            return res.status(200).send({ message: 'Archivo suvido' })
                        })
                    }
                    // data is a buffer containing file content
                    else {
                        //si ya existe no es nesesario que la cambiemos, x que ya existe una                        
                        return res.status(303);
                    }
                });
        }
        else {
            return res.status(404);
        }
    }
    else {

    }
}
//para biblioteca imagen
LibrosControl.getFoto = async (req, res, next) => {
    //var url="/Users/plutarco/Desktop/LSon/Back-END/imagenBibliotecas/"+ req.params.foto;
    res.writeHead(200, { 'content-type': 'image/jpg' });
    fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/imagenBibliotecas/" + req.params.foto).pipe(res);
};
//para libros imagenes
LibrosControl.getFotoLibro = async (req, res, next) => {
    //var url="/Users/plutarco/Desktop/LSon/Back-END/imagenBibliotecas/"+ req.params.foto;
    var ultimo = req.params.foto.length;
    if (req.params.foto.substring(ultimo - 1, ultimo) == "-") {
        res.writeHead(200, { 'content-type': 'image/jpg' });

        fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/NoDisponible.jpg").pipe(res);
    }
    else {
        try {
            res.writeHead(200, { 'content-type': 'image/jpg' });
            fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/" + req.params.foto).pipe(res);
        } catch (error) {
            fs.createReadStream("/Users/plutarco/Desktop/LSon/Back-End/ImagenLibros/NoDisponible.jpg").pipe(res);
        }
    }
};
LibrosControl.PostFoto = async (req, res, next) => {

    console.log(req.params.iduser);
    const biblioteca = await Biblioteca.findOne({ _id: req.params.iduser });

    if (biblioteca != null) {
        var url = "/Users/plutarco/Desktop/LSon/Back-END/imagenBibliotecas/" + biblioteca.poster;
        console.log(url);
        let EDFile = req.files.Myimagen;
        EDFile.mv(`./imagenBibliotecas/${'' + biblioteca._id + '-' + EDFile.name}`, err => {
            if (err) return res.status(500).send({ message: err })

            return res.status(200).json(biblioteca._id + '-' + EDFile.name);
        });
        const b = await Biblioteca.findOneAndUpdate({ _id: biblioteca._id }, { poster: biblioteca._id + '-' + EDFile.name });
    }
    else {
        res.json('no eres una biblioteca, no tienes acceso');
    }
};
LibrosControl.PostArchivo = async (req, res) => {
    //MyArchivo
    console.log("entroaqui.2")
    var arregloenvia = new Array();
    const generos = await GenerosEncuentra.find();

    console.log(req.params.iduser);
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });
    console.log(biblioteca.nombre);
    //lo recogemos el archivo y lo guardamos para su procesamiento
    if (biblioteca != null) {
        let EDFile = req.files.MyArchivo;
        //si existe lo elimina para crearlo otra vez
        var url = "/Users/plutarco/Desktop/LSon/Back-END/RepositorioArchivos/" + biblioteca._id + ".csv";
        console.log(url);
        var x = "/Users/plutarco/Desktop/LSon/Back-END/RepositorioArchivos/5ca577891f8fd43fccae7dd3.csv"


        EDFile.mv(`./RepositorioArchivos/${'' + biblioteca._id + ".csv"}`, err => {
            if (err) return res.status(500).send({ message: err })
            else {
                fs.readFile(url, function (err, fileData) {
                    parse(fileData, { columns: false, trim: true }, function (err, rows) {
                        //console.log(rows[1])
                        //verificamos que los titulos vengan bien
                        var x = 1;

                        for (var i = 0; i < rows.length - 1; i++) {
                            if (rows[0][0] != "Titulo" || rows[0][1] != "Autor" ||
                                rows[0][2] != "Genero" || rows[0][3] != "Sinopsis" || rows[0][4] != "Editorial"
                                || rows[0][5] != "Anho" || rows[0][6] != "NumPaginas") {
                                console.log("Ocurrio un error con los titulos");
                                break;
                            }
                            else {
                                console.log("aqui van los datos")
                                //maximo 250 caracteres de titulo     
                                //titulo                                                  
                                if (rows[x][0].length > 0 && rows[x][0].length < 250) {
                                    //autor
                                    //console.log("entra1");
                                    if (rows[x][1].length > 0 && rows[x][1].length < 250) {
                                        //console.log("entra2");
                                        //genero
                                        var en = false;
                                        for (var p = 0; p < generos.length; p++) {
                                            var pp = generos[p];
                                            if (pp.genero == rows[x][2]) {
                                                en = true;
                                                break;
                                            }
                                        }
                                        if (en == true) {
                                            //si es igual a true no se hace nada
                                        }
                                        else {
                                            //si no lo tiene lo ponemos como indefinido ya que esta equivocado
                                            rows[x][2] = "Indefinido";
                                            //console.log("entra3");
                                        }


                                        //Sinopsis
                                        if (rows[x][3].length > 0 && rows[x][3].length < 250) {
                                            //console.log("entra4");
                                            //editorial
                                            if (rows[x][4].length > 0 && rows[x][4].length < 250) {
                                                //console.log("entra5");
                                                //año
                                                if (aentero(rows[x][5]) == true && rows[x][5].length == 4) {
                                                    //si etos son verdaderos pasa
                                                }
                                                else {
                                                    //si no pasa nosotros le asignamos el año 2000
                                                    rows[x][5] = "2000";
                                                    //console.log("entra6");
                                                }
                                                //numero de paginas
                                                if (aentero(rows[x][6]) == true && rows[x][6].length > 0) {

                                                }
                                                else {
                                                    //se colocan 99 paginas si no espesifica
                                                    rows[x][6] = "99";
                                                    //console.log("entra7");
                                                }
                                                //despues de comprovar todo y su estan equivocados colocarles
                                                //un avlor por defecto, proseguimos a crearlo y a agregarlo al arreglo
                                                //que sera mandado a front-end
                                                var libropasa = new Libros({
                                                    titulo: rows[x][0],
                                                    autor: rows[x][1],
                                                    genero: rows[x][2],
                                                    sinopsis: rows[x][3],
                                                    editorial: rows[x][4],
                                                    anho: rows[x][5],
                                                    poster: "",
                                                    numPaginas: rows[x][6],
                                                });
                                                //console.log(libropasa);
                                                arregloenvia.push(libropasa);
                                                console.log(arregloenvia);

                                            }

                                        }
                                    }
                                }
                                x++;
                            }
                        }
                        console.log("Arreglo");
                        console.log(arregloenvia);
                        return res.status(200).json(arregloenvia);

                    })

                })

            }

        });


    }

}
function aentero(x) {
    var xx = false;
    var xxx = isNaN(x);
    if (xxx == false) {
        xx = true;
    }
    return xx;
}
LibrosControl.AgregarLibrosMasivos = async (req, res) => {
    console.log(req.body.length);
    console.log(req.params.iduser);
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });
    if (biblioteca != null) {


        for (let i = 0; i < req.body.length; i++) {
            //para cada uno de los libros se buscara si ya existe uno con ese nombre
            //si existe solo a el libro ya registrado sele coloca su id correspondiente
            //sino se creara

            //busco por nombre
            var titulo = req.body[i].titulo.toUpperCase();
            const nombre = await Libros.findOne({ titulo: titulo });
            console.log(nombre);
            if (nombre == null) {
                //como no se encontro la creamos y agregamos
                const libro = new Libros({
                    titulo: req.body[i].titulo,
                    autor: req.body[i].autor,
                    genero: req.body[i].genero,
                    sinopsis: req.body[i].sinopsis,
                    editorial: req.body[i].editorial,
                    anho: req.body[i].anho,
                    poster: req.body[i].poster,
                    numPaginas: req.body[i].numPaginas,
                }, { _id: false });
                //a mayusculas todas
                libro.titulo = libro.titulo.toUpperCase();
                libro.autor = libro.autor.toUpperCase();
                libro.genero = libro.genero.toUpperCase();
                libro.editorial = libro.editorial.toUpperCase();
                libro.bibliotecas = biblioteca._id;
                //guardamos el libro, como verificamos que no existiera por el nombre
                libro.save();
                console.log(libro);
            }
            //si tiene algo aqui es donde se creara el registro
            else {
                var entro = false;
                for (var o = 0; o < Object(nombre.bibliotecas).length; o++) {
                    if (nombre.bibliotecas[i] == biblioteca._id) {
                        entro = true;
                        break;
                    }
                }
                //no lo tiene
                if (entro == false) {
                    Libros.find({ titulo: titulo })
                        .then((libro) => {
                            libro[0].bibliotecas.push(biblioteca._id);
                            libro[0].save();
                        });
                }
            }
        }
        return res.status(200).json('Se han agregado correctamente')
    }
    else {
        return res.json('No es una biblioteca!!!');
    }
}
LibrosControl.PostImagenNoExistente = async (req, res) => {
    //console.log(req.files);
    //res.send(req.files.Myimagen.name);
    const biblioteca = await Biblioteca.findOne({ idUsuario: req.params.iduser });

    if (biblioteca != null) {
        console.log(req.params.idlibro);
        if (req.params.idlibro != null) {
            let EDFile = req.files.Myimagen;
            var xx = req.params.idlibro;
            console.log(EDFile);
            EDFile.mv(`./ImagenLibros/${'' + xx + '-' + EDFile.name}`, err => {
                if (err) return res.status(500).send({ message: err })

                return res.status(200).send({ message: 'Archivo suvido' })
            });
            //despues de crearla se nesesita actualizar su portada
            const libro = await Libros.findOne({ _id: xx });
            libro.poster = EDFile.name.toUpperCase();
            libro.save();
        }
        else {
            return res.status(404);
        }
    }
    else {

    }
}
module.exports = LibrosControl;