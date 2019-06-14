import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { Biblioteca } from 'src/app/models/bibliteca';
import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-clientes-bibliotecas-information',
  templateUrl: './clientes-bibliotecas-information.component.html',
  styleUrls: ['./clientes-bibliotecas-information.component.css']
})
export class ClientesBibliotecasInformationComponent implements OnInit {
  regresa:User;
  biblio: Biblioteca[];
  ciudades:String[]= new Array();
  constructor(private  ClienteService:ClienteService,private user:UserService, private router:Router) { 
    this.user.getuser()
    .subscribe(
      data=>{ 
       this.regresa=data as User;        
       if(this.regresa.role!="Cliente"){
        this.router.navigate(['/']);
       }        
      },
      error=> this.router.navigate(['/'])
    );
  }

  ngOnInit() {
    this.bibliotecas();
  }
  bibliotecas(){
    this.ClienteService.GetBibliotecas()
    .subscribe(
      data=>{
        this.biblio=data as Biblioteca[];
        console.log(this.biblio);
        //le agrego todas al arreglo
        for(var i=0;i<this.biblio.length;i++){
          this.ciudades.push(this.biblio[i].ciudad);
          
        }        
      }
    )
  }
}


