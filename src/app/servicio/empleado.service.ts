import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private urlEmp = 'http://localhost:3000/empleados';

  constructor(private http : HttpClient) { }

  consultarEmpCorreo( correo ){
    return this.http.post<any>(this.urlEmp + "/buscar-emp-correo", correo);
  }
  modificarContraEmp(empleado){
    return this.http.put<any>(this.urlEmp + "/modificar-contrasenia", empleado);
  }
  modificarPerfilEmp(empleado){
    return this.http.put<any>(this.urlEmp + "/modificar-perfil", empleado);
  }

  buscarEmpId(empleado){
    return this.http.post<any>(this.urlEmp + "/buscar-emp-id", empleado);
  }

}

