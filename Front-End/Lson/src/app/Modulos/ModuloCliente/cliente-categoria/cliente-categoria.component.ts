import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { Libro } from 'src/app/models/libros';

@Component({
  selector: 'app-cliente-categoria',
  templateUrl: './cliente-categoria.component.html',
  styleUrls: ['./cliente-categoria.component.css']
})
export class ClienteCategoriaComponent implements OnInit {
  categoria:String;
  contador:number;
  arreglo:Number[]= new Array();  
  regresa:User;

  encontramosen: number = 1;
  total:number;
  menos: string;
  numeroanterior: number = 1;
  aux: Number[] = new Array();
  este:String;
  //paginado 2.0
  //es un auxiliar
  c: number;
  //numero de posibles para el paginado
  cc: number;
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
    console.log("este otro"+this.ClienteService.Categoria);
    if(this.ClienteService.Categoria==null){
      this.ClienteService.Categoria="Acción";
    }
    this.principal();
    this.count();
  }
  agregaFavoritos(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarFavoritos(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }
  agregaPorLeer(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarPorLeer(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }
  agregaLedios(_id:String){
    console.log(_id);
    console.log(this.regresa._id);
    this.ClienteService.AgregarLeidos(this.regresa._id,_id)
    .subscribe(
      data=>{
        alert(data as String);
      }
    )
  }


  principal(){
    
    this.ClienteService.GetLibrosGenero(this.ClienteService.Categoria,1)
    .subscribe(
      data=>{
        this.ClienteService.LibrosGenero= data as Libro[]
      }
    )
    this.categoria=this.ClienteService.Categoria;
    
  }
  count() {
    var xx = this.ClienteService.CountLibrosGenero(this.ClienteService.Categoria)
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
    if (numero == 6 && numero<this.cc) {
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
    

    this.ClienteService.GetLibrosGenero(this.ClienteService.Categoria,numero)
      .subscribe(res => {
        //console.log(res);
        //this.regresa=res as User
        this.ClienteService.LibrosGenero= res as Libro[];
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
  envia(libros:Libro){
    console.log(libros);
    this.ClienteService.LibroSeleccionado=libros;
  }
}
