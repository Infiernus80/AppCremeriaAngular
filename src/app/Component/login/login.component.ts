import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Servicio
import { InicioSesionService } from 'src/app/servicio/inicio-sesion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //objeto json
  tipoUsu = "";
  usuario = {
    correo: "",
    contrasenia: ""
  }

  constructor(private inicioS: InicioSesionService, private rutas: Router) { }
  exito: boolean = true;
  ngOnInit(): void {
  }
  login() {
    this.inicioS.login(this.usuario).subscribe(
      res => {
        const datos = res.envio.split(',');
        localStorage.setItem('token', datos[0]);
        localStorage.setItem('nombre',datos[1]);
        localStorage.setItem('tipo', datos[2]);
        localStorage.setItem('correo', datos[3]);
        this.inicioS.loginExito();
        this.tipoUsu = this.inicioS.tipoUsu();
        this.exito = true;
        if (this.tipoUsu == 'Admin' || this.tipoUsu == 'Cajero') {
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto',
            text: 'Bienvenido: '+localStorage.getItem('nombre'),
          })
          this.rutas.navigate(['/Home']);
          
             

        } else if (this.tipoUsu == 'Cliente' || this.tipoUsu == 'Bodega') {
          this.rutas.navigate(['/InicioSesion']);
          
        }

      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Datos incorrectos!',
          
        })
        
        this.exito = false;
      }
    );
  }

  cerrarModal() {
    this.exito = true;
  }
  
}
