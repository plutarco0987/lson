import { Data } from '@angular/router';
export class Biblioteca {
    constructor(_id='',nombre='',direccion='',telefono='' ,idUsuario='',poster="",ciudad='',correo=''){

        this._id=_id;        
        this.nombre=nombre;
        this.direccion=direccion;
        this.telefono=telefono;
        this.poster=poster;
        this.idUsuario=idUsuario;
        this.ciudad=ciudad;
        this.correo=correo;
    }
    correo:string;
    ciudad:string;
    _id:string;
   nombre:string;
    direccion:string;
    telefono:string;
    idUsuario:string;
    poster:String;
}
