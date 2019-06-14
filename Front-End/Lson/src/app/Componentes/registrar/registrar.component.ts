import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registrarForm:FormGroup = new FormGroup({
    nombre:new FormControl(null,Validators.required),
    email:new FormControl(null,[Validators.email,Validators.required]),
    role:new FormControl("Role"),
    pass:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required),
  });
  constructor(private _router:Router,private userservice:UserService) { }

  ngOnInit() {
  }
  registrar(){
    if(!this.registrarForm.valid || (this.registrarForm.controls.pass.value != this.registrarForm.controls.cpass.value)){
      console.log("invalido "); return ;
    }
    var x= new User();
    x.name=this.registrarForm.value.nombre;
    x.email=this.registrarForm.value.email;
    x.pass=this.registrarForm.value.pass;
    x.role=this.registrarForm.value.role;
    console.log(x);
    this.userservice.postUser(x)
    .subscribe(
      data=>{
        console.log(data);
        this._router.navigate(['Login']);       
      },
      err=>{
        console.error(err);
      }
    )
    /*
    this.userservice.registrar(JSON.stringify(this.registrarForm.value))
    .subscribe(
      data=>{
        console.log(data);
        this._router.navigate(['Login']);        
      },
      err=>{
        console.error(err);
      }
    )
    */
    //console.log(JSON.stringify(this.registrarForm.value));
  }
}


