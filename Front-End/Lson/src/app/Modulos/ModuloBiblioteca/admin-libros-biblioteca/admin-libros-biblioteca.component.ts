import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { Libro } from 'src/app/models/libros';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
//import { BibliotecaServiceService } from 'src/app/services/biblioteca-service.service';
//import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-admin-libros-biblioteca',
  templateUrl: './admin-libros-biblioteca.component.html',
  styleUrls: ['./admin-libros-biblioteca.component.css']
})
export class AdminLibrosBibliotecaComponent implements OnInit{
  
  
  regresa: User;
  selectedFile: File = null;
  encontramosen: number = 1;
  total: number;
  contador: number;
  menos: string;
  librol: Libro;
  arreglo: Number[] = new Array();
  aux: Number[] = new Array();

  //paginado 2.0
  //es un auxiliar
  c: number;
  //numero de posibles para el paginado
  cc: number;
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
      );

  }
  ngOnInit() {
    //carga los primeros 10 mensajes por ende estara hardcodeado
    this.getLibros();
    this.count();
    document.getElementById('1').style.background="red";
    document.getElementById('1').style.color="white";
  }

  getLibros() {
    this.BibliotecaService.getLibros(1)
      .subscribe(res => {
        //console.log(res);
        //this.regresa=res as User
        this.BibliotecaService.Libros = res as Libro[];
       
      });
  }
  eliminar(_id: string) {
    this.BibliotecaService.DeleteLibro(_id, this.regresa._id)
      .subscribe(
        data => {
          //this.ngOnInit();
          //this.getLibros();
          //this.ngOnInit();
          //this.getsigant();
          location.reload();
          alert('se a eliminado ese libro de su registro');
        }
      )
  }

  onFileChanged(event, id) {
    this.selectedFile = event.target.files[0];
    console.log(id);
    this.BibliotecaService.PostImagenNoExistente(this.selectedFile, this.regresa._id, id)
      .subscribe(
        res => {
          alert('Se a agregado la imagen correctamente');
          this.BibliotecaService.getLibros(this.encontramosen)
            .subscribe(res => {
              //console.log(res);
              //this.regresa=res as User
              this.BibliotecaService.Libros = res as Libro[];
            });
        }
      )
  }
  count() {
    var xx = this.BibliotecaService.CountLibros()
      .subscribe(
        data => {
          this.c = data as number;
          console.log(this.c);
          //lo que tenemos
          var x = this.c / 10;
          //el residuo
          var xx = this.c % 10;
          this.cc = x - (xx / 10);
          if (xx > 0) {
            this.cc++;
          }
          console.log(this.cc);
          //vaciamos el arreglo aux el cual tiene los valores de paginado
          while (this.aux.length > 0) {
            this.aux.pop();
          }
          //llenamos con la cantidad de this.cc
          for (let i = 0; i < 6; i++) {
            this.aux[i] = (i + 1);
          }
          this.sigienteultimoetc();
         
        }
      )
  
  }
  sigienteultimoetc() {
    //loqueamos anterior
    if (this.encontramosen == 1) {
      var anterior = document.getElementById("anterior");
      anterior.setAttribute("class", "page-item disabled");
    }
    //bloqueamos siguiente
    if (this.encontramosen == this.cc) {
      var anterior = document.getElementById("siguiente");
      anterior.setAttribute("class", "page-item disabled");
    }


    
    if (this.encontramosen < this.cc) {
      var anterior = document.getElementById("siguiente");
      anterior.setAttribute("class", "page-item");
    }
    if (this.encontramosen > 1) {
      var anterior = document.getElementById("anterior");
      anterior.setAttribute("class", "page-item");
    }  
  }
  paginado(numero) {
    console.log(numero);
    if (numero < 6) {
      //si se encuentra en las primeras 6 no hay nesesidad de moverle
    }
    //si es igual a 6 debemos ponerle que aparescan  2 -7 (si thic.cc> 6)
    if (numero == 6&& numero<this.cc) {
      //vaciamos el arreglo aux el cual tiene los valores de paginado
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
      for (let i = 1; i <= 6; i++) {
        this.aux[i - 1] = (i + 1);
      }

      //si no no se novera nada
    }
    if(numero<6){
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
        for (let j = 0; j < 6; j++) {
          this.aux[j] = j+1;          
        }
    }
    //si no es el ultimo y es mayor a 6
    if (numero > 6 && numero < this.cc) {
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
      for (let i = numero - 4; i < 6; i++) {
        this.aux[i] = (i);
      }
    }

    //si es el ultimo
    if (numero == this.cc && this.cc> 6) {
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
        var numero2 = numero - 5;
        for (let j = 0; j < 6; j++) {
          this.aux[j] = numero2;
          numero2++;
        }
      

    }
    

    this.BibliotecaService.getLibros(numero)
      .subscribe(res => {
        //console.log(res);
        //this.regresa=res as User
        this.BibliotecaService.Libros = res as Libro[];
      });
      this.sigienteultimoetc();

      //color
      console.log(document.getElementById(numero));
      document.getElementById(numero).style.background="red";
      document.getElementById(numero).style.color="white";
      document.getElementById(''+this.encontramosen).style.background="white";
      document.getElementById(''+this.encontramosen).style.color="black";
      if(numero==1){
        document.getElementById('1').style.background="red";
    document.getElementById('1').style.color="white";
      }
      //console.log(.setAttribute('StyleSheet','background:red'));
      this.encontramosen = numero;
      this.sigienteultimoetc();
  }
  paginadoutlimo(){
    var numero=this.cc;
    console.log(numero);

    while (this.aux.length > 0) {
      this.aux.pop();
    }
    //llenamos con la cantidad de this.cc dara 6 vueltas
      var numero2 = numero - 5;
      for (let j = 0; j < 6; j++) {
        this.aux[j] = numero2;
        numero2++;
      }

    this.BibliotecaService.getLibros(numero)
      .subscribe(res => {
        //console.log(res);
        //this.regresa=res as User
        this.BibliotecaService.Libros = res as Libro[];
      });
      this.sigienteultimoetc();

      //color
      var numero3=String(this.cc);
      console.log(document.getElementById(numero3));
      //nuevo
      document.getElementById(numero3).style.background="red";
      document.getElementById(numero3).style.color="white";
      //anterior
      document.getElementById(''+this.encontramosen).style.background="white";
      document.getElementById(''+this.encontramosen).style.color="black";
      //console.log(.setAttribute('StyleSheet','background:red'));
      this.encontramosen = numero;
      this.sigienteultimoetc();
  }
  paginadoprimero(){
    var numero=1;
    if (numero < 6) {
      //si se encuentra en las primeras 6 no hay nesesidad de moverle
    }
    //si es igual a 6 debemos ponerle que aparescan  2 -7 (si thic.cc> 6)
    if (numero == 6) {
      //vaciamos el arreglo aux el cual tiene los valores de paginado
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
      for (let i = 1; i <= 6; i++) {
        this.aux[i - 1] = (i + 1);
      }

      //si no no se novera nada
    }
    if(numero<6){
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
        for (let j = 0; j < 6; j++) {
          this.aux[j] = j+1;          
        }
    }
    //si no es el ultimo y es mayor a 6
    if (numero > 6 && numero < this.cc) {
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
      for (let i = numero - 4; i < 6; i++) {
        this.aux[i] = (i);
      }
    }

    //si es el ultimo
    if (numero == this.cc && this.cc> 6) {
      while (this.aux.length > 0) {
        this.aux.pop();
      }
      //llenamos con la cantidad de this.cc dara 6 vueltas
        var numero2 = numero - 5;
        for (let j = 0; j < 6; j++) {
          this.aux[j] = numero2;
          numero2++;
        }
      

    }
    

    this.BibliotecaService.getLibros(numero)
      .subscribe(res => {
        //console.log(res);
        //this.regresa=res as User
        this.BibliotecaService.Libros = res as Libro[];
      });
      this.sigienteultimoetc();

      //color
      console.log(document.getElementById(""+numero));
      document.getElementById(""+numero).style.background="red";
      document.getElementById(""+numero).style.color="white";
      document.getElementById(''+this.encontramosen).style.background="white";
      document.getElementById(''+this.encontramosen).style.color="black";
      if(numero==1){
        document.getElementById('1').style.background="red";
    document.getElementById('1').style.color="white";
      }
      //console.log(.setAttribute('StyleSheet','background:red'));
      this.encontramosen = numero;
      this.sigienteultimoetc();
  }

}
