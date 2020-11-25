import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/servicio/empleado.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nombre = localStorage.getItem('nombre');
  letra = this.nombre.charAt(0);
  correo : String = localStorage.getItem('correo');
  empleado = {
    nombre: "",
    apellidos: "",
    telefono: "",
    sueldo: 0,
    correo: this.correo,
    contrasenia: "",
    fechaNac: "",
    tipo: ""   
  }
  fechaNacimiento = String[''];
  constructor(private empleadoService : EmpleadoService) { }

  ngOnInit(): void {
    this.miInfo();
    let fecha = new Date()
    //fecha.setFullYear()

  }
  miInfo(){
    this.empleadoService.consultarEmpCorreo(this.empleado).subscribe(res=>{
      this.empleado = res;
      this.fechaNacimiento = this.empleado.fechaNac.split('T');
    },
    err => console.log(err)
    );
  }

}
