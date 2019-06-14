import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/models/libros';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/Servicios/Cliente/cliente.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  Resultados:Libro[];
  parametro:String;
  regresa: User;
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
    this.parametro = this.routes.snapshot.params['tituloautor'];
    console.log(this.parametro);
    this.ClienteService.Libroelegidobusqueda=null;
    if(this.parametro.length>0){
      this.ClienteService.GetBusqueda(this.parametro)
      .subscribe(
        data=>{
          this.Resultados= data as Libro[];
          console.log(this.Resultados);
        }
      )
    }
    else{
      alert('Se regreso a inicio, Si desea buscar un dato debe tener 4 caracteres minimo')
      this.router.navigate(['/Cliente/Index']);
    }
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
  envia(libros:Libro){
    console.log(libros);
    this.ClienteService.LibroSeleccionado=libros;
  }
}
