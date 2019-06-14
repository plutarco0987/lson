import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarComponent } from './Componentes/registrar/registrar.component';
import { NavClienteModule } from './Modulos/ModuloCliente/nav-cliente/nav-cliente.module';
import { BibliotecaModule } from './Modulos/ModuloBiblioteca/biblioteca/biblioteca.module';
import { ErrorComponent } from './Componentes/error/error.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  //{path: 'Login', component: LoginComponent},
  {path: 'Registrarse', component: RegistrarComponent},
  {path: 'Cliente', loadChildren:()=> NavClienteModule},
  {path: 'Biblioteca', loadChildren:()=>BibliotecaModule},
  {path: 'Error',component: ErrorComponent},
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
