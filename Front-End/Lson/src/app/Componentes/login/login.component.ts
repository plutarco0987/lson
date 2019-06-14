import { Component, OnInit } from '@angular/core';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Servicios/Users/user.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    pass: new FormControl(null, Validators.required),
  });
  x: User;
  xx: User;
  a: String;
  constructor(private _router: Router, private user: UserService) { }

  ngOnInit() {
  }
  registrarte(){
    this._router.navigate(['Registrarse']); 
  }
  acceso() {
    //console.log(this.loginForm.value);
    var u: User;
    u = null;
    if (!this.loginForm.valid) {
      alert('Datos invalidos, debe llenar todos los datos'); return;
    }
    //console.log(JSON.stringify(this.loginForm.value));
    this.user.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {
          //console.log("entro");
          console.log(data);
          this.a = data as String;
          u = this.loginForm.value as User;
          console.log(u);
          //console.log(this.xx);
          //this._router.navigate(['Biblioteca']);
          this.user.getuser()
            .subscribe(
              data => {
                this.x = data as User;
                //console.log(this.x);
                //console.log(u);
                //console.log(this.x.role);
                //console.log(this.xx.role);
                if (this.a != null) {
                  this._router.navigate([''+this.x.role]);
                }
              }
            )
        },
        error => alert('O la el correo o contraseña estan mal')
      )
  }
}
