import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-nav-biblioteca',
  templateUrl: './nav-biblioteca.component.html',
  styleUrls: ['./nav-biblioteca.component.css']
})
export class NavBibliotecaComponent implements OnInit {
  public nombrelibro:String;
  regresa: User;
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
  logout() {
    this.user.logout()
      .subscribe(
        data => { console.log(data); this.router.navigate(['/']) },
        error => { console.log(error); this.router.navigate(['/']) }
      )
  }
  ngOnInit() {
  }

  buscar() {
    console.log(this.BibliotecaService.ubicacion);
    var x = this.BibliotecaService.NombreLibro;
    //console.log(x);
    if (x == null) {
      alert('Debes poner el titulo del libro');
    }
    else {
      this.router.navigate(['Biblioteca/Carga']);      
    }

  }
}
