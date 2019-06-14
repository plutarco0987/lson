import { Data } from '@angular/router';

export class User {
    constructor(_id='',name='',email='',pass='',role=''){
      this._id=_id; 
      this.name=name,
       this.email=email,
       this.pass=pass,
       this.role=role
       
    }
    _id:string;
   name:String;
   email:String;
   pass:String;
   role:String;   
}
