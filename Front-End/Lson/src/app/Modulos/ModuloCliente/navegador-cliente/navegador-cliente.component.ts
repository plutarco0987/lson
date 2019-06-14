import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navegador-cliente',
  templateUrl: './navegador-cliente.component.html',
  styleUrls: ['./navegador-cliente.component.css']
})
export class NavegadorClienteComponent implements OnInit {
  regresa:User;
  genero:String[];
  g:any[];
  boton:boolean=false;
  tituloSeleccionado:String;
  constructor(private user:UserService, private router:Router,private  ClienteService:ClienteService) { 
    this.user.getuser()
    .subscribe(
      data=>{ 
       this.regresa=data as User;        
       if(this.regresa.role!="Cliente"){
        this.router.navigate(['/']);
       }        
      },
      error=> this.router.navigate(['/'])
    )
  }
  logout(){
    this.user.logout()
      .subscribe(
        data=>{console.log(data); this.router.navigate(['Login'])},
        error=> console.log(error)
      )    
  }
  ngOnInit() {
    this.generos();
    
  }
  generos(){
    this.ClienteService.getGeneros()
    .subscribe(
      data=>{
        this.ClienteService.Generos= data as String[];
        console.log(this.ClienteService.Generos);

      }
    )
  }
  categoria(nombre:String){
    console.log(nombre);
    this.ClienteService.Categoria=nombre;
    this.ClienteService.Librero=null;
    this.router.navigate(['Cliente/Carga']);
  }
  favoritos(){
    this.ClienteService.Librero="FAVORITOS";
    this.ClienteService.Categoria=null;
    this.router.navigate(['Cliente/Carga']);
  }
  porleer(){
    this.ClienteService.Librero="PORLEER"
    this.ClienteService.Categoria=null;
    this.router.navigate(['Cliente/Carga']);
  }
  leidos(){
    this.ClienteService.Librero="LEIDOS"
    this.ClienteService.Categoria=null;
    this.router.navigate(['Cliente/Carga']);
  }
  Buscar(){
    if(this.tituloSeleccionado.length>=3){
      this.ClienteService.Libroelegidobusqueda=this.tituloSeleccionado;
      this.router.navigate(['Cliente/Carga']);
    }
    else{
      alert('Nesasario 4 caracteres para realizar una busqueda');
    }
  }
}
