import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLibrosBibliotecaComponent } from '../admin-libros-biblioteca/admin-libros-biblioteca.component';
import { HomeBibliotecaComponent } from '../home-biblioteca/home-biblioteca.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { AgregarLibroComponent } from '../agregar-libro/agregar-libro.component';
import { LibroEncontradoComponent } from '../libro-encontrado/libro-encontrado.component';
import { CargaComponent } from '../carga/carga.component';
import { AgregarLibrosMuchosComponent } from '../agregar-libros-muchos/agregar-libros-muchos.component';

const routes: Routes = [
{path:'',component:HomeBibliotecaComponent},
{path:'Mislibros',component:AdminLibrosBibliotecaComponent},
{path:'Perfil',component:PerfilComponent},
{path:'AgregarLibro',component:AgregarLibroComponent},//LibroEncontradoBiblioteca
{path:'LibroEncontradoBiblioteca',component:LibroEncontradoComponent},
{path:'LibroEncontradoBibliotecaRecarga',component:LibroEncontradoComponent},
{path:'AgregarDeFormaMasiva',component:AgregarLibrosMuchosComponent},
{path:'Carga',component:CargaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibliotecaRoutingModule { }
