import { Component, OnInit, assertPlatform } from '@angular/core';
import { Alert } from 'src/app/models/Alert';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { User } from 'src/app/models/user';
import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-agregar-libros-muchos',
  templateUrl: './agregar-libros-muchos.component.html',
  styleUrls: ['./agregar-libros-muchos.component.css']
})
export class AgregarLibrosMuchosComponent implements OnInit {
  selectedFile: File = null;
  regresa: User;
  Libros: Libro[];
  preciono: boolean = false;
  constructor(private user: UserService, private router: Router, private BibliotecaService: BibliotecaServiceService) {
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
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  enviar() {
    if (this.selectedFile != null) {
      this.BibliotecaService.PostTodo(this.selectedFile, this.regresa._id)
        .subscribe(
          data => {
            console.log(data);
            this.Libros = data as Libro[];
            this.preciono = true;
            if(this.Libros.length==0){
              this.preciono=false;
              alert('A ocurrido un error Porfavor Revice su formato')
            }
          }
        )
    }
    else {
      alert('NO a seleccionado nada para enviar');
    }
  }
  quitar(id: any) {
    console.log(id);
    for (let i = 0; i < this.Libros.length; i++) {
      if(this.Libros[i]._id==id){
        this.Libros.splice(i, i+1);
      }
    }
    if(this.Libros.length==0){
      this.preciono=false;
    }
  }
  guardarcambios(){
    this.BibliotecaService.GuardarTodo(this.Libros,this.regresa._id)
    .subscribe(
      data=>{        
        alert(data);
        this.preciono=false;
      }
    )
  }
}
