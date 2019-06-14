import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { Libro } from 'src/app/models/libros';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-libro-encontrado',
  templateUrl: './libro-encontrado.component.html',
  styleUrls: ['./libro-encontrado.component.css']
})
export class LibroEncontradoComponent implements OnInit {
  nombre: String;
  regresa: User;
  libro: Libro[];
  fallo:boolean=false;
  constructor(private BibliotecaService: BibliotecaServiceService, private user: UserService, private router: Router) {
    this.user.getuser()
      .subscribe(
        data => {
          this.regresa = data as User;
          if (this.regresa.role != "Biblioteca") {
            this.router.navigate(['/']);
          }
        },
        error => this.router.navigate(['/'])
      )
      
  }

  ngOnInit() {
    //this.mostrar();
    this.libro=null;
    this.mostrar2();
  }

  mostrar2(){
    var x = this.BibliotecaService.NombreLibro;
    console.log("llego:"+x);
    this.BibliotecaService.getLibroNombre(this.BibliotecaService.NombreLibro)
      .subscribe(
        data => {
          var xx = data as string;
          if (xx == 'No se encontro ningun libro con ese nombre' || x == 'No es una biblioteca') {
            this.fallo=true;
          }
          else {
            //console.log(data);
            this.BibliotecaService.libroencontrado = data as Libro[];
            this.libro=data as Libro[];
            console.log(this.libro);
            //console.log(this.BibliotecaService.libroencontrado);
            
            this.BibliotecaService.NombreLibro=null;
          }

        }
      )
  }


  mostrar() {
    if (this.BibliotecaService.libroencontrado == null) {
      alert('Proporcione un libro a buscar');
      //this.router.navigate[('/Biblioteca')];
    }
    else {
      //location.reload();
      this.libro = this.BibliotecaService.libroencontrado;
      console.log(this.libro);
    }
    var x = this.BibliotecaService.NombreLibro;

    this.BibliotecaService.getLibroNombre(this.BibliotecaService.NombreLibro)
      .subscribe(
        data => {
          var xx = data as string;
          if (xx == 'No se encontro ningun libro con ese nombre' || x == 'No es una biblioteca') {
            alert(xx);
          }
          else {
            //console.log(data);
            this.BibliotecaService.libroencontrado = data as Libro[];
            //console.log(this.BibliotecaService.libroencontrado);
            if (this.BibliotecaService.ubicacion == "http://localhost:4200/Biblioteca/LibroEncontradoBiblioteca") {
              location.reload();
            }
          }

        }
      )

  }
  agregar(idlibro){
    //console.log(idlibro);
    this.BibliotecaService.AgregarLibro(idlibro)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }
}
