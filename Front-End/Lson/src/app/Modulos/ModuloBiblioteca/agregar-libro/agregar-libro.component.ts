import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, assertPlatform } from '@angular/core';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Libro } from 'src/app/models/libros';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { AlertServiceService } from 'src/app/Servicios/Alertas/alert-service.service';
import { AlertType, Alert } from 'src/app/models/Alert';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-agregar-libro',
  templateUrl: './agregar-libro.component.html',
  styleUrls: ['./agregar-libro.component.css'],

})
export class AgregarLibroComponent implements OnInit {
  @ViewChild('alert', { read: ElementRef }) alert: ElementRef;


  selectedFile: File = null;
  regresa: User;
  idUsuario: any;
  loginForm: FormGroup = new FormGroup({
    titulo: new FormControl(null, Validators.required),
    autor: new FormControl(null, Validators.required),
    editorial: new FormControl(null, Validators.required),
    sinopsis: new FormControl(null, Validators.required),
    anho: new FormControl(null, Validators.required),
    genero: new FormControl(null, Validators.required),
    numPaginas: new FormControl(null, Validators.required),
    imagen: new FormControl(null, Validators.required),
  });

  constructor(private BibliotecaService: BibliotecaServiceService, private user: UserService, private router: Router, private alertService: AlertServiceService) {

  }
  ngOnInit() {
    //this.BibliotecaService.selectedLibro as Libro;
    this.BibliotecaService.getGeneros()
      .subscribe(res => {
        //console.log(res);
        this.regresa = res as User;
        this.BibliotecaService.Generos = res as String[];
      });

    this.user.getuser()
      .subscribe(
        data => {
          //console.log(data);
          this.regresa = data as User;
          this.idUsuario = this.regresa._id;
          if (this.regresa.role != "Biblioteca") {
            this.router.navigate(['/']);
          }
        },
        error => this.router.navigate(['/'])
      )

     
  }



  addLibro(form?: NgForm) {
    //console.log(form);
    var x = new Libro();
    x.titulo = form.value.titulo;
    x.anho = form.value.anho;
    x.autor = form.value.autor;
    x.editorial = form.value.editorial;
    x.genero = form.value.genero;
    x.sinopsis = form.value.sinopsis;
    x.numPaginas = form.value.NumPaginas;
    x.poster = this.selectedFile.name;
    console.log(x);
    var paso = false;
    //console.log(paso);    
    //Agregar el libro y notificar que se agrego y limipar
    this.BibliotecaService.postLibro(x, this.idUsuario)
      .subscribe(
        res => {
          console.log('post: '+res)
          if (res as String == 'Ya tiene un libro registrado para su biblioteca' || res as String =='El libro se encontraba en inventario, se a agregado a su biblioteca') {
            alert(res as String);
          }
          else {
            this.BibliotecaService.selectedLibro = res as Libro;
            console.log(this.BibliotecaService.selectedLibro._id);
            var id = this.BibliotecaService.selectedLibro._id;

            this.BibliotecaService.postLibroImagen(this.selectedFile, this.idUsuario, id)
              .subscribe(
                res => {
                  console.log('se agrego la imagen');
                }
              )
              alert('se agrego su libro correctamente');
          }
          //console.log(res);

          this.resetForm(form);
        }
      );


  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  resetForm(form?: NgForm) {
    //alert("paso");
    if (form) {
      form.reset();
      this.BibliotecaService.selectedLibro = new Libro();
    }
  }

}
