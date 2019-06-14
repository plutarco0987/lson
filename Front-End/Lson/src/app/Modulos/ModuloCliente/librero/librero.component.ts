import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { User } from 'src/app/models/user';
import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-librero',
  templateUrl: './librero.component.html',
  styleUrls: ['./librero.component.css']
})
export class LibreroComponent implements OnInit,AfterViewInit {
  regresa: User;
  cantidad: number;
  Arreglo:String[];
  constructor(private user: UserService, private router: Router, private ClienteService: ClienteService) {
    this.user.getuser()
      .subscribe(
        data => {
          this.regresa = data as User;
          if (this.regresa.role != "Cliente") {
            this.router.navigate(['/']);
          }
        },
        error => this.router.navigate(['/'])
      )

  }

  ngOnInit() {
    console.log(this.ClienteService.Librero);
    if(this.ClienteService.Librero==null){
      this.ClienteService.Librero="FAVORITOS"; 
    }
    if (this.ClienteService.Librero == "FAVORITOS") {
      this.ClienteService.GetLibrosFavoritos()
        .subscribe(
          data => {
            this.ClienteService.LibrosFPL = data as Libro[];
            console.log(this.ClienteService.LibrosFPL);
            console.log(this.ClienteService.LibrosFPL.length);                       
            this.cantidad = this.ClienteService.LibrosFPL.length;  
            
                              
          }
        )
        this.Arreglo=new Array();
            this.Arreglo.push("");
            this.Arreglo.push("+Por Leer");
            this.Arreglo.push("+Leido");
            this.Arreglo.push("Quitar"); 
        
    }
    if (this.ClienteService.Librero == "PORLEER") {
      this.ClienteService.GetLibrosPorLeer()
        .subscribe(
          data => {
            this.ClienteService.LibrosFPL = data as Libro[];
            console.log(this.ClienteService.LibrosFPL);
            console.log(this.ClienteService.LibrosFPL.length);
            this.cantidad = this.ClienteService.LibrosFPL.length;
          }
        )
        this.Arreglo=new Array();
        this.Arreglo.push("+Favoritos");
            this.Arreglo.push("");
            this.Arreglo.push("+Leido");
            this.Arreglo.push("Quitar"); 
    }
    if (this.ClienteService.Librero == "LEIDOS") {      
      this.ClienteService.GetLibrosLeidos()
        .subscribe(
          data => {
            this.ClienteService.LibrosFPL = data as Libro[];
            console.log(this.ClienteService.LibrosFPL);
            console.log(this.ClienteService.LibrosFPL.length);
            this.cantidad = this.ClienteService.LibrosFPL.length;
          }
        )
        this.Arreglo=new Array();
            this.Arreglo.push("+Favoritos");
            this.Arreglo.push("");
            this.Arreglo.push("");
            this.Arreglo.push("Quitar"); 
    }


    
  }
  ngAfterViewInit(){
    let x=this.Arreglo;
    console.log(x);
  }

  //metodos de botones
  agregaFavoritos(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarFavoritos(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }
  agregaPorLeer(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarPorLeer(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }
  agregaLedios(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarLeidos(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
        this.ngOnInit();
      }
    )
    
  }
  quitar(id:String){
    this.ClienteService.EliminarLibrero(this.regresa._id,id,this.ClienteService.Librero)
      .subscribe(
        data=>{
          alert(data as String);
          this.ngOnInit();
        }
      )
  }
  envia(libros:Libro){
    console.log(libros);
    this.ClienteService.LibroSeleccionado=libros;
  }
}
