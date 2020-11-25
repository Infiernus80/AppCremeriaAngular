import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

//Servicios
import {ProductoService} from 'src/app/servicio/producto.service';
import {VentaService} from 'src/app/servicio/venta.service';
import {InicioSesionService} from 'src/app/servicio/inicio-sesion.service';
import {EmpleadoService} from 'src/app/servicio/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos;

  filtros = {
    nombre : "",
    categoria : "Todo",
    subCategoria : "Todos"
  }
  p = 1;

  productoB = {
    codigo : "",
    nombreProd : "",
    precio : 0,
    categoria : "",
    subCategoria : "",
    marca : "",
    descripcion : "",
    img : ""
  }

  //Variables para venta
  venta = {
    estado:'en proceso',
    total:'',
    fechaVenta:'',
    correo: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    codigoProd: '',
    precioProd : 0,
    cantidadProd : 0,
    monto : 0,
    id: ''
  }

  datosBusqueda = {
    correoEmp : ''
  }
  empleado = {
    nombre : '',
    apellidos: '',
    telefono: '',
    correo: ''
  }

  ventaEncontrada;

  exitoVenta = 0;

  productoPedido;

  pedidoBProd = {
    correoCli : '',
    codigoProd :''
  }

  exitoCarrito = 0;

  constructor(
    private iniciSesion:InicioSesionService,
    private rutas:Router,
    private producto:ProductoService,
    private ventaService:VentaService,
    private empleadoSer:EmpleadoService
  ) { }
  tipo;
  entro = false;
  ngOnInit(): void {
    // this.consultar();

    this.iniciSesion.change.subscribe(isOpen => {
      this.entro = isOpen;
    });

    this.iniciSesion.change1.subscribe(isOpen =>{
      this.tipo = isOpen;
    });

    this.entro = this.iniciSesion.loginExito();
    this.tipo = this.iniciSesion.tipoUsu();

    if (this.entro) 
      this.buscarVentaPendiente();
    
  }
  // consultar(){
  //   if (this.filtros.categoria == 'Todo') 
  //     this.consultarTodo();
  //    else{
  //      if (this.filtros.subCategoria == 'Todos') 
  //        this.consultarCat();
  //      else
  //        this.consultarCatSub();
  //    }
  // }
  // consultarTodo(){
  //   this.producto.buscarTodoSA(this.filtros).subscribe(res => {
  //     this.productos = res
  //   }, 
  //   err => console.log(err));
  // }
  consultarProd(codigo){
    this.productoB.codigo = codigo;

    this.producto.buscarCodigo(this.productoB).subscribe(res => {
      this.productoB = res
    }, 
    err => console.log(err));
  }
     //Funciones para agregar a la venta
     agregarCarrito(codigoProd, precioProd){
      this.venta.codigoProd = codigoProd;
      this.venta.precioProd = precioProd;
      this.venta.cantidadProd = 1;
      this.venta.monto = precioProd * this.venta.cantidadProd;
      this.pedidoBProd.correoCli = localStorage.getItem('correo');
      this.pedidoBProd.codigoProd = codigoProd;
  
      this.buscarVentaPendiente();
      
      if (this.ventaEncontrada) {      
        this.venta.id = this.ventaEncontrada._id
        //console.log('hay pedido registrado')
  
        this.ventaService.buscarVentaPendiente(this.pedidoBProd).subscribe(res => {
          this.productoPedido = res;
          //console.log('hice la peticion')
          
          if (this.productoPedido) {
            //console.log('sumar productos')
            //console.log(this.productoPedido);
            for (let i = 0; i < this.productoPedido.length; i++) {
                if (this.productoPedido[i].codigoProd == this.pedidoBProd.codigoProd) {
                  //console.log('encontre esto: ');
                    //console.log(this.productoPedido[i]);
                    this.productoPedido[i].cantidadProd++;
                    this.productoPedido[i].monto = this.productoPedido[i].cantidadProd * this.productoPedido[i].precioProd;
                    //console.log(this.productoPedido[i]);
                    // this.modificarProductoPedido(this.productoPedido[i]);
                }
              
            }
          }
        }, err => {
          //console.log('no hay')
          this.agregarProductoPedido();
        });
        
      }else{
        //llenamos los datos del empleado
        this.empleado.correo = localStorage.getItem('correo');
        this.empleadoSer.consultarEmpCorreo(this.empleado).subscribe(res => {
          this.empleado = res
          //llenamos la informacion del cliente en el pedido
          this.venta.nombre = this.empleado.nombre;
          this.venta.apellidos = this.empleado.apellidos;
          this.venta.correo = this.empleado.correo;
          this.venta.telefono= this.empleado.telefono;
  
          //registramos el pedido
          this.regVenta();
        },
        err => console.log(err));
      }
      
  
    }
    regVenta(){
      this.ventaService.regPedido(this.venta).subscribe(res => {
        //console.log('se agrego al carrito')
        this.buscarVentaPendiente();
      },
      err => {
        //console.log(err);
      });
    }
    buscarVentaPendiente(){
      this.datosBusqueda.correoEmp = localStorage.getItem('correo');
  
      this.ventaService.buscarVentaPendiente(this.datosBusqueda).subscribe(res => {
        this.ventaService = res;
      }, 
      err => {
        //console.log(err);
      })
    }
    agregarProductoPedido(){
      this.exitoCarrito = 3; //activa el spinner
      this.ventaService.agregarProducto(this.venta).subscribe(res => {
        //console.log('se agrego un producto al pedido');
        this.exitoCarrito = 1;
      },
      err => {
        //console.log(err);
      })
    }
  
    // modificarProductoPedido(informacion){
    //   this.exitoCarrito = 3; 
    //   this.ventaService.modificarProducto(informacion).subscribe(res => {
    //     this.exitoCarrito = 2;
    //     //console.log('se agrego cantidad al producto');
    //   }, err => console.log(err))
    // }
  
    reiniciarExitoCarrito(){
      this.exitoCarrito = 0;
    }
}
