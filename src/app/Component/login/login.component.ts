import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/servicio/inicio-sesion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   //objeto json
   tipoUsu = "";
   usuario ={
     correo: "",
     contrasenia: ""
   }

  constructor(private inicioS : InicioSesionService,private rutas : Router) { }
  exito: boolean = true;
  ngOnInit(): void {
  }
  login(){
    this.inicioS.login(this.usuario).subscribe(
      res => {
         const datos = res.envio.split(',');
         localStorage.setItem('token', datos[0]);
         localStorage.setItem('nombre', datos[1]);
         localStorage.setItem('tipo', datos[2]);
         localStorage.setItem('apellidoP', datos[3]);
         localStorage.setItem('apellidoM', datos[4]);
         this.inicioS.loginExito();
         this.tipoUsu = this.inicioS.tipoUsu();   
         this.exito = true;
         var Nombre = localStorage.getItem('nombre')
         
         if (this.tipoUsu == 'Admin' || this.tipoUsu == 'Cajero') {          
          this.rutas.navigate(['/Home']);       
          // window.location.reload();   
         
        }else if(this.tipoUsu == 'Cliente' ||this.tipoUsu == 'Bodega') {
          this.rutas.navigate(['/InicioSesion']);       
          // window.location.reload();    
        }   
         
      },
      err =>{
        this.exito = false;
      }
    );
  }

  cerrarModal(){
    this.exito = true;
  }
}
