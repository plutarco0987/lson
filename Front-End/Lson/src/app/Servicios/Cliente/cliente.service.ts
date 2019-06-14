import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from 'src/app/models/libros';
import { Biblioteca } from 'src/app/models/bibliteca';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  Libros: Libro[];
  LibrosGenero: Libro[];
  Generos: String[];
  Categoria: String;
  Librero:String;
  LibrosFPL:Libro[];
  Biblioteca:Biblioteca;
  LibroSeleccionado:Libro;
  LibrosBibliotecaTodos: Libro[];
  Libroelegidobusqueda:String;
  readonly URL = 'http://localhost:3000/Cliente/';
  constructor(private http: HttpClient) {

  }
  GetPrincipal(contador: any) {
    return this.http.get(this.URL + "Index/" + contador, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  CountLibros(){
    return this.http.get(this.URL+'CountLibros/',{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetBibliotecas() {
    return this.http.get(this.URL + "Bibliotecas", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getGeneros() {
    return this.http.get(this.URL + "Generos/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetLibrosGenero(Genero:String,contador:any){  
    //:contador
    return this.http.get(this.URL + "LibrosGenero/"+Genero+"/"+contador, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  AgregarFavoritos(IdUser:String,IdLibro:String){
    ///AgregaFavoritos/:iduser/:idlibro
    return this.http.get(this.URL + "AgregaFavoritos/"+IdUser+"/"+IdLibro, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  AgregarPorLeer(IdUser:String,IdLibro:String){
    ///AgregaFavoritos/:iduser/:idlibro
    return this.http.get(this.URL + "AgregaPorLeer/"+IdUser+"/"+IdLibro, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  AgregarLeidos(IdUser:String,IdLibro:String){
    ///AgregaFavoritos/:iduser/:idlibro
    return this.http.get(this.URL + "AgregaLeidos/"+IdUser+"/"+IdLibro, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetLibrosFavoritos(){  
    return this.http.get(this.URL + "Favoritos/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetLibrosPorLeer(){  
    return this.http.get(this.URL + "PorLeer/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetLibrosLeidos(){  
    return this.http.get(this.URL + "Leidos/", {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  ///Eliminar/:iduser/:idlibro/:Categoria'
  EliminarLibrero(IdUser:String,IdLibro:String,Categoria:String){
    return this.http.get(this.URL + "Eliminar/"+IdUser+"/"+IdLibro+"/"+Categoria, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  ///CantidadLibrosGenero/:genero
  CountLibrosGenero(genero:String){
    console.log(genero);
    return this.http.get(this.URL+'CantidadLibrosGenero/'+genero,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  ///LibrosBiblioteca/:idbiblioteca
  LibrosBiblioteca(idbiblioteca:String,contador:any){
    console.log(idbiblioteca);
    return this.http.get(this.URL+'LibrosBiblioteca/'+idbiblioteca+"/"+contador,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
///Biblioteca/:idbiblioteca
  GetBiblioteca(idbiblioteca:String){
    console.log(idbiblioteca);
    return this.http.get(this.URL+'Biblioteca/'+idbiblioteca,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetBibliotecasNombres(idlibro:String){
    return this.http.get(this.URL+'BibliotecasNombres/'+idlibro,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  GetBusqueda(abuscar:String){
    return this.http.get(this.URL+'Busqueda/'+abuscar,{
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
