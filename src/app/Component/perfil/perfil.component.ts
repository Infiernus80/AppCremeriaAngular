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
   _id:"",
   nombre: "",
   apellidos: "",
   telefono: "",
   sueldo: 0,
   correo: this.correo,
   contrasenia: "",
   fechaNac: "",
   tipo: ""   
 }
 
 empleadoM = {
   _id: "",
   nombre: "",
   apellidos: "",
   telefono: "",
   correo: "",
   contrasenia: "",
   fechaNac: "",  
 }
 
 contasenias = {
   contrasenia: "",
   contrasenia2: ""
 }
 
 
 fechaNacimiento = String[''];
 modificarPerfil = false;
 modificarContra = false;
 exito = 0;
 exitoContra = 0;
 
   constructor(private empleadoService : EmpleadoService) { }
 
   ngOnInit(): void {
     this.miInfo();
 
   }
 
   miInfo(){
     this.empleadoService.consultarEmpCorreo(this.empleado).subscribe(res=>{
       this.empleado = res;
       this.fechaNacimiento = this.empleado.fechaNac.split('T');
       this.empleado.fechaNac = this.fechaNacimiento[0];
       this.empleadoM._id = this.empleado._id;
       //console.log(this.empleadoM._id);
     },
     err => console.log(err)
     );
   }
 
   infoModificar(){
     this.empleadoService.buscarEmpId(this.empleadoM).subscribe(res => {
       this.empleadoM = res;
       this.fechaNacimiento = this.empleadoM.fechaNac.split('T');
       this.empleadoM.fechaNac = this.fechaNacimiento[0];
     },
     err => console.log(err))
   }
 
   modificarPerfilEmp(){
 
     if(this.modificarPerfil){
         this.empleadoService.modificarPerfilEmp(this.empleadoM).subscribe   (res=> {
           this.exito = 1;
           this.miInfo();
         },
         err => {
           this.exito = 2;
         });
     }
 
     if (this.modificarContra) {
       if(this.contasenias.contrasenia === this.contasenias.contrasenia2){ 
         this.empleadoService.modificarContraEmp(this.contasenias).subscribe(res=>{
           this.exito = 1;
         },
         err => {
           this.exito = 2;
         });
       
       }else{
         this.exitoContra = 3;
       }
     }
   }
 
   //funciones extra
   reiniciarExito(){
     this.exito = 0;
   }
 
   modificarP(){
     if(this.modificarPerfil)
       this.modificarPerfil = false;
     else
       this.modificarPerfil = true;
   }
 
   modificarC(){
     if(this.modificarContra)
       this.modificarContra = false;
     else
       this.modificarContra = true;
   }
 }