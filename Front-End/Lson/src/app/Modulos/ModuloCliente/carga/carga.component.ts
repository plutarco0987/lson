import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servicios/Users/user.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  constructor(private  ClienteService:ClienteService,private user:UserService, private router:Router) { }

  ngOnInit() {
    if(this.ClienteService.Categoria!=null){
      this.router.navigate(['Cliente/Categoria']);
    }
    if(this.ClienteService.Librero!=null){
      this.router.navigate(['Cliente/Librero']);
    }
    if(this.ClienteService.Libroelegidobusqueda!=null){
      this.router.navigate(['Cliente/Busqueda/'+this.ClienteService.Libroelegidobusqueda]);
    }
  }

}
