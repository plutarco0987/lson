import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import { SwiperModule } from 'angular2-useful-swiper';

import { NavClienteRoutingModule } from './nav-cliente-routing.module';
import { NavegadorClienteComponent } from '../navegador-cliente/navegador-cliente.component';
import { ClienteCategoriaComponent } from '../cliente-categoria/cliente-categoria.component';
import { ClienteHomeComponent } from '../cliente-home/cliente-home.component';
import { ClienteBibliotecasComponent } from '../cliente-bibliotecas/cliente-bibliotecas.component';
import { ClientePerfilComponent } from '../cliente-perfil/cliente-perfil.component';
import { ClienteIndexComponent } from '../cliente-index/cliente-index.component';
import { ClientesBibliotecasInformationComponent } from '../clientes-bibliotecas-information/clientes-bibliotecas-information.component';
import { CargaComponent } from '../carga/carga.component';
import { LibreroComponent } from '../librero/librero.component';
import { LibrosBibliotecaComponent } from '../libros-biblioteca/libros-biblioteca.component';
import { InformacionLibroComponent } from '../informacion-libro/informacion-libro.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';
 


@NgModule({
  declarations: [
    NavegadorClienteComponent,
    ClienteCategoriaComponent,
    ClienteHomeComponent,
    ClienteBibliotecasComponent,
    ClientePerfilComponent,
    ClienteIndexComponent,
    ClientesBibliotecasInformationComponent,
    CargaComponent,
    LibreroComponent,
    LibrosBibliotecaComponent,
    InformacionLibroComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    NavClienteRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxCarouselModule,
      SwiperModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [ClienteHomeComponent]
})
export class NavClienteModule { }
