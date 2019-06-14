import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { User } from 'src/app/models/user';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';

@Component({
  selector: 'app-home-biblioteca',
  templateUrl: './home-biblioteca.component.html',
  styleUrls: ['./home-biblioteca.component.css']
})
export class HomeBibliotecaComponent implements OnInit {
  regresa:User;
  constructor(private user:UserService, private router:Router, private BibliotecaService: BibliotecaServiceService) { 
    this.user.getuser()
    .subscribe(
      data=>{ 
       this.regresa=data as User;        
       if(this.regresa.role!="Biblioteca"){
        this.router.navigate(['/']);
       }        
      },
      error=> this.router.navigate([''])
    )
  }

  ngOnInit() {
    var x= location.href;
    this.BibliotecaService.ubicacion=x;        
  }

}



