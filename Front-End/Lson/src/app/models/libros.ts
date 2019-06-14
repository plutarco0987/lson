export class Libro {
    constructor(_id='',titulo='',autor='',genero='',editorial='',
    anho=0,numPaginas=0,poster="",sinopsis=''){

        this._id=_id;        
        this.titulo=titulo;
        this.autor=autor;
        this.genero=genero;
        this.editorial=editorial;
        this.anho=anho;
        this.numPaginas=numPaginas;
        this.poster=poster;
        this.sinopsis=sinopsis;
        
    }

    _id:string;
    titulo:string;
    autor:string;
    genero:string;
    editorial:string;
    anho:number
    numPaginas:number;
    poster:String;
    sinopsis:String;
    imagen:File;
}
