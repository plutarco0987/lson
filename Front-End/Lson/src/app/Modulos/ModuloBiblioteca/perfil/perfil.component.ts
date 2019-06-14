import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { Router } from '@angular/router';
import { BibliotecaServiceService } from 'src/app/Servicios/Biblioteca/biblioteca-service.service';
import { Biblioteca } from 'src/app/models/bibliteca';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  url:String;
  regresa:User;
  selectedFile: File =null;
  constructor(private user:UserService, private router:Router, private BibliotecaService:BibliotecaServiceService ) { 
    this.user.getuser()
    .subscribe(
      data=>{ 
       this.regresa=data as User;        
       if(this.regresa.role!="Biblioteca"){
        this.router.navigate(['/']);
       }        
      },
      error=> this.router.navigate(['/'])
    )
  }

  ngOnInit() {
    
    this.inicializaPerfil();
  }

  inicializaPerfil(){
    this.BibliotecaService.getPerfil()
    .subscribe(
      data=>{
        console.log(data);
        this.regresa=data as User;   
        this.BibliotecaService.Perfil= data as Biblioteca;
        this.url="http://localhost:3000/Biblioteca/Foto/"+this.BibliotecaService.Perfil.poster;        
        //console.log(this.BibliotecaService.Perfil);
      }
      
    );
    this.BibliotecaService.getCiudades()
    .subscribe(
      data=>{
        this.BibliotecaService.Ciudades=data as String[]; 
        console.log(this.BibliotecaService.Ciudades);
      }
    );
  }
  cancelar(){
    this.router.navigate(['/Biblioteca']);
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];       
    console.log(this.regresa._id);
    
    this.BibliotecaService.postImagen(this.selectedFile,this.regresa._id)
    .subscribe(
      data=>{
        var x=data as String;
        console.log(x);
        this.url="http://localhost:3001/Biblioteca/Foto/"+x;  
        console.log(this.url);
      }      
    );
    
    
    console.log(document.getElementById('imagen'));
  }
  actualizar(form?:NgForm){
    console.log(this.BibliotecaService.Perfil);

    this.BibliotecaService.PostPerfil(this.regresa._id,this.BibliotecaService.Perfil)
    .subscribe(
      data=>{
        alert(data as String);
      }      
    )    
  }
}
