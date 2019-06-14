import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavegadorClienteComponent } from '../navegador-cliente/navegador-cliente.component';
import { ClienteBibliotecasComponent } from '../cliente-bibliotecas/cliente-bibliotecas.component';
import { ClienteCategoriaComponent } from '../cliente-categoria/cliente-categoria.component';
import { ClientePerfilComponent } from '../cliente-perfil/cliente-perfil.component';
import { ClienteHomeComponent } from '../cliente-home/cliente-home.component';
import { ClienteIndexComponent } from '../cliente-index/cliente-index.component';
import { CargaComponent } from '../carga/carga.component';
import { LibreroComponent } from '../librero/librero.component';
import { LibrosBibliotecaComponent } from '../libros-biblioteca/libros-biblioteca.component';
import { InformacionLibroComponent } from '../informacion-libro/informacion-libro.component';
import { BusquedaComponent } from '../busqueda/busqueda.component';

const routes: Routes = [
  {path:'',component:ClienteIndexComponent},
  {path:'Index',component:ClienteIndexComponent},
  {path:'Bibliotecas',component:ClienteBibliotecasComponent},
  {path:'Categoria',component:ClienteCategoriaComponent},
  {path:'Perfil',component:ClientePerfilComponent},
  {path:'Carga',component:CargaComponent},
  {path:'Librero',component:LibreroComponent},
  {path:'LibrosBiblioteca/:idbiblioteca',component:LibrosBibliotecaComponent},
  {path:'InformacionLibro/:idlibro',component:InformacionLibroComponent},
  {path:'Busqueda/:tituloautor',component:BusquedaComponent},
  {path:'**',component:ClienteIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavClienteRoutingModule { }
