import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { User } from 'src/app/models/user';
import { Libro } from 'src/app/models/libros';
import { Biblioteca } from 'src/app/models/bibliteca';

@Component({
  selector: 'app-informacion-libro',
  templateUrl: './informacion-libro.component.html',
  styleUrls: ['./informacion-libro.component.css']
})
export class InformacionLibroComponent implements OnInit {
  regresa: User;
  parametro:String;
  llego:Libro;
  bibliotecas:String[]= new Array();
  constructor(private user: UserService, private router: Router, private ClienteService: ClienteService, private routes: ActivatedRoute) { 
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
    this.Principal();
    
  }

  Principal(){
    this.parametro = this.routes.snapshot.params['idlibro'];
    

    if(this.ClienteService.LibroSeleccionado!=null){
      //significa que ya vienen los datos, solo los ponemos directos 
      this.llego=this.ClienteService.LibroSeleccionado;
      console.log(this.llego);
    }
    //si no llego de la forma normal este lo buscara por su id...
    else{
      if(this.parametro.length==24){

      }
      else{
        alert('Debe poner mas de 4 caracteres para la busqueda');
        this.router.navigate(['Cliente/Index']);
  
      }
    }
    //independientemente traigo las empresas o bibliotecas en las cuales se pueden encontrar
    this.ClienteService.GetBibliotecasNombres(this.parametro)
    .subscribe(
      data=>{
        this.bibliotecas=data as String[];
      }
    )
    console.log(this.parametro);   
  }
}
