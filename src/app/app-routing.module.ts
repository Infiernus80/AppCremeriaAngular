import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//guardianes
import {LoginGuard} from './guardians/login.guard'

//componetes
import { LoginComponent } from './Component/login/login.component';
import { HomeComponent } from './Component/home/home.component';
import { PerfilComponent } from './Component/perfil/perfil.component';

const routes: Routes = [
  // {path:'',component:SplashScreenComponent},
  {path:'InicioSesion',component:LoginComponent},
  {path:'Home',component:HomeComponent,canActivate:[LoginGuard]},
  {path:'Perfil',component:PerfilComponent,canActivate:[LoginGuard]},
  //Principal
  {path:'',redirectTo:'InicioSesion',pathMatch:'full'},
  {path:'**',redirectTo:'InicioSesion',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
