import { Data } from '@angular/router';

export class Generos {
    constructor(_id='',genero=''){
      this._id=_id; 
     this.genero=genero;
       
    }
    _id:string;
   genero:string; 
}
