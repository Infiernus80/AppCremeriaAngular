import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
//Servicio
import { InicioSesionService } from '../servicio/inicio-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private rutas: Router, private loginService: InicioSesionService){}

  canActivate(): boolean{
    if (this.loginService.loginExito()) {
      
        return true;
    }else{
      this.rutas.navigate(['/InicioSesion']);
      return false;
    }
  }
}
