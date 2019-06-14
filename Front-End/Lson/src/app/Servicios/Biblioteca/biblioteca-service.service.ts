import { Injectable } from '@angular/core';
import { Libro } from '../../models/libros';
import { Biblioteca } from '../../models/bibliteca';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BibliotecaServiceService {
  selectedLibro: Libro;
  libroencontrado: Libro[];
  Perfil: Biblioteca;
  //arreglo para almacenar los valores
  Libros: Libro[];
  Generos: String[];
  Ciudades: String[];
  NombreLibro: String;
  ubicacion:String;
  //forma de utilizarla  
  //constate
  readonly URL = 'http://localhost:3000/Biblioteca/';
  constructor(private http: HttpClient) {
    this.selectedLibro = new Libro();
    this.ubicacion="/"
  }

  getLibros(contador: any) {
    return this.http.get(this.URL + "Libros/" + contador, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
    //return this.http.get(this.URL);    
  }
  postLibro(Libro: Libro, iduser: string) {
    console.log(Libro);
    return this.http.post(this.URL + "Libro/" + iduser, Libro);
  }
  getGeneros() {
    return this.http.get(this.URL + "Generos/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getPerfil() {
    return this.http.get(this.URL + "Perfil/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  postLibroImagen(imgenviada: File, iduser: string, idlibro: string) {
    console.log(imgenviada);
    console.log('lego aquiii');
    console.log(idlibro);
    const formdata = new FormData();
    formdata.append('Myimagen', imgenviada, imgenviada.name);
    return this.http.post(this.URL + "Imagen/" + iduser + '/' + idlibro, formdata);
  }
  getCiudades() {
    return this.http.get(this.URL + "Ciudades/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  ///SetFoto/:iduser
  postImagen(imgenviada: File, iduser: string) {
    console.log(iduser);
    console.log('lego aquiii')
    const formdata = new FormData();
    formdata.append('Myimagen', imgenviada, imgenviada.name);
    console.log(formdata);
    return this.http.post(this.URL + "SetFoto/" + iduser, formdata);
  }
  ///PostPerfil/:iduser
  PostPerfil(iduser: string, Biblioteca: Biblioteca) {
    console.log(iduser);
    console.log('lego aquiii');
    console.log(Biblioteca);
    return this.http.post(this.URL + "PostPerfil/" + iduser, Biblioteca);
  }
  DeleteLibro(id: string, iduser:string) {
    return this.http.delete(this.URL+'Libros/'+id+'/'+iduser);
  }
  postNombreLibro(nombre:string){
    this.NombreLibro=nombre;
  }
  getNombreLibro(){
    return this.NombreLibro;
  }
  getLibroNombre(nombre:String){
    return this.http.get(this.URL+'Libros/ConsultaNombre/'+nombre,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  AgregarLibro(idlibro:String){
    ///AgregarLibro/:idlibro
    return this.http.get(this.URL+'AgregarLibro/'+idlibro,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  CountLibros(){
    ///CountLibros
    return this.http.get(this.URL+'CountLibros/',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  PostTodo(archivo: File, iduser: string) {
    console.log(iduser);
    console.log('lego aquiii')
    const formdata = new FormData();
    formdata.append('MyArchivo', archivo, archivo.name);
    console.log(formdata);    
    return this.http.post(this.URL + "SetArchivo/" + iduser, formdata);
  }
  GuardarTodo(libros:Libro[], iduser:String){
    return this.http.post(this.URL + "AgregarLibrosMasivos/" + iduser, libros);
  } //PostImagenNoExistente
  PostImagenNoExistente(imgenviada: File, iduser: string, idlibro: string) {
    console.log(imgenviada);
    console.log('lego aquiii');
    console.log(idlibro);
    const formdata = new FormData();
    formdata.append('Myimagen', imgenviada, imgenviada.name);
    return this.http.post(this.URL + "PostImagenNoExistente/" + iduser + '/' + idlibro, formdata);
  }
}
