import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cliente-bibliotecas',
  templateUrl: './cliente-bibliotecas.component.html',
  styleUrls: ['./cliente-bibliotecas.component.css']
})
export class ClienteBibliotecasComponent implements OnInit {

  regresa:User;
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
  }

}
