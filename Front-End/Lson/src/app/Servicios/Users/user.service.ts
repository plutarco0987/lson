import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:User;
  readonly URL='http://localhost:3000/';
  constructor(private http:HttpClient) { 
    this.user=new User();
  }
  /*
  registrar(body:any){
    return this.http.post(URL+"Registrar",body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  */
 postUser(User:User){
    
  return this.http.post(this.URL+"Registrar",User);    
}
login(body:any){
  return this.http.post(this.URL+"Login",body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('Content-Type','application/json')
  });   

}
logout(){
  return this.http.get(this.URL+"Logout",{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('Content-Type','application/json')
  });  
}
getuser(){
  return this.http.get(this.URL+"User",{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('Content-Type','application/json')
  });   
}
}
