import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  constructor(private user:UserService, private router:Router, private BibliotecaService:BibliotecaServiceService ) { }

  ngOnInit() {
    if(this.BibliotecaService.NombreLibro!=null){
      this.router.navigate(['Biblioteca/LibroEncontradoBiblioteca']);
    }
  }

}
