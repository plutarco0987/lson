import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

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
