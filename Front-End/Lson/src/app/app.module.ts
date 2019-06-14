import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { CommonModule } from '@angular/common';

import { NavClienteModule } from './Modulos/ModuloCliente/nav-cliente/nav-cliente.module';
import { HttpClientModule} from '@angular/common/http';
import { NgxCarouselModule } from 'ngx-carousel';
import { BibliotecaModule } from './Modulos/ModuloBiblioteca/biblioteca/biblioteca.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserService} from 'src/app/Servicios/Users/user.service';
import { AlertServiceService } from './Servicios/Alertas/alert-service.service';
import { ErrorComponent } from './Componentes/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    ErrorComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavClienteModule,
    NgxCarouselModule,
    BibliotecaModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCarouselModule,    
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
