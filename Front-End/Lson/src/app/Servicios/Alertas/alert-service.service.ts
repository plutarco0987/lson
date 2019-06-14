import { Injectable } from '@angular/core';


declare var toast:any;

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(){}

Success(titulo:string,message?:string){
toast.success(titulo,message);
}
}
