
import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { NavBibliotecaComponent } from '../nav-biblioteca/nav-biblioteca.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import { SwiperModule } from 'angular2-useful-swiper';
import { AdminLibrosBibliotecaComponent } from '../admin-libros-biblioteca/admin-libros-biblioteca.component';
import { HomeBibliotecaComponent } from '../home-biblioteca/home-biblioteca.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AgregarLibroComponent } from '../agregar-libro/agregar-libro.component';
import { AlertServiceService } from 'src/app/Servicios/Alertas/alert-service.service';
import { LibroEncontradoComponent } from '../libro-encontrado/libro-encontrado.component';
import { CargaComponent } from '../carga/carga.component';
import { AgregarLibrosMuchosComponent } from '../agregar-libros-muchos/agregar-libros-muchos.component';

@NgModule({
  declarations: [
    NavBibliotecaComponent,
    AdminLibrosBibliotecaComponent,
    HomeBibliotecaComponent,
    PerfilComponent,
    AgregarLibroComponent,
    LibroEncontradoComponent,
    CargaComponent,
    AgregarLibrosMuchosComponent
  ],
  imports: [
    CommonModule,
      BibliotecaRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxCarouselModule,
      SwiperModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AlertServiceService],
  bootstrap:[NavBibliotecaComponent]
})
export class BibliotecaModule { }
