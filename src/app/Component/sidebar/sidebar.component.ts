import { RecursiveTemplateAstVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Servicios
import { InicioSesionService } from 'src/app/servicio/inicio-sesion.service';
import { EmpleadoService } from 'src/app/servicio/empleado.service';

//alertas con Sweet
import Swal from 'sweetalert2'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  opened = false;
  entro : boolean;
  nombre = localStorage.getItem('nombre');
  letra = this.nombre.charAt(0);
  correo : String = localStorage.getItem('correo');
  empleado = {
    nombre: "",
    apellidos: "",
    correo: this.correo,
    tipo: ""   
  }
  constructor(private rutas: Router,private loginService :InicioSesionService,private empleadoS:EmpleadoService) { }

  ngOnInit(): void {
    //Metodo para siderbar
    const btn = document.querySelector('#menu-btn');
    const menu = document.querySelector('#sidemenu')
    btn.addEventListener('click', e => {
      menu.classList.toggle('menu-expanded');
      menu.classList.toggle("menu-collapsed");
      document.querySelector("body").classList.toggle("body-expanded")
    });
    this.miInfo();

  }
  miInfo(){
    this.empleadoS.consultarEmpCorreo(this.empleado).subscribe(res=>{
      this.empleado = res;
    },
    err => console.log(err)
    );
  }

  logout(){
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Estas seguro de cerrar sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("nombre");
        localStorage.removeItem("tipo");
        localStorage.removeItem("apellidos");
        this.entro = this.loginService.loginExito();
        this.rutas.navigate(['/inicio']);
      }
    })
    
  }
}
