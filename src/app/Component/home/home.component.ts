import { Component, OnInit } from '@angular/core';
import { BeepService } from './beep.service';
import Quagga from 'quagga';
import Swal from 'sweetalert2';

//Servicio
import { ProductoService } from 'src/app/servicio/producto.service';
import { VentaService } from 'src/app/servicio/venta.service';
import { EmpleadoService } from 'src/app/servicio/empleado.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  constructor(private beepService: BeepService, private productoSer: ProductoService, private ventaSer: VentaService, private empleadoSer: EmpleadoService) {
  }
  ngOnInit(): void {
    this.consultarVenta();
  }
  private lastScannedCode: string;
  private lastScannedCodeDate: number;
  errorMessage: string;
 
  productosEnco;

  venta;
  total = 0;
  cambioVen;

  ventaSchema = {
    total: 0,
    estatus: 'en proceso',
    correoEmp: '',
    nombreEmp: '',
    apellidosEmp: '',
    telefonoEmp: '',
    codigoProd: '',
    precioProd: 0,
    cantidadProd: 0,
    monto: 0
  }

  empleado = {
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: ''
  }

  filtrosVenta = {
    correoEmp: '',
    total: 0
  }
  productosInfo = [{
    cantidadProd: 0,
    monto: 0,
    idProductoCarrito: '',
  }];
  
  filtroCRUDVenta = {
    idProd: '',
    id: ''
  }

  filtrosModificarProd = {
    _id : '',
    codigoProd: '',
    cantidadProd: 0,
    monto: 0
  }

  tieneArray = {
    codigoProd: '',
    precioProd: 0,
    nombreProd: '',
    cantidadProd: 0,
    monto: 0,
    correoEmp: ''
};

  ngAfterViewInit(): void {
    if (!navigator.mediaDevices || !(typeof navigator.mediaDevices.getUserMedia === 'function')) {
      this.errorMessage = 'getUserMedia is not supported';
      return;
    }

    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment'
        },
        area: { // defines rectangle of the detection/localization area
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader']
      },
    },
      (err) => {
        if (err) {
          this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
        } else {
          Quagga.start();
          Quagga.onDetected((res) => {
            console.log(res.codeResult.code)
            this.onBarcodeScanned(res.codeResult.code);
          });
        }
      });

    setTimeout(() => {
    }, 10000);
  }
  onBarcodeScanned(code: string) {
    // ignore duplicates for an interval of 1.5 seconds
    const now = new Date().getTime();
    if (code === this.lastScannedCode && (now < this.lastScannedCodeDate + 1500)) {

      return;
    }

    this.lastScannedCode = code;
    this.lastScannedCodeDate = now;
    

    this.consultarVenta();
    if (this.venta) {
      console.log('se encontro una venta en proceso')   

      //ignorar productos que no esten registrados
    this.consultarProductosTodo()
    if (this.productosEnco) {

      console.log(this.productosEnco);
      for (let i = 0; i < this.productosEnco.length; i++) {

        if (this.productosEnco[i].codigo == code) {
          let encontro = false;
          this.beepService.beep();

          //buscar si el producto ya existe en el arreglo tiene
          for (let j = 0; j < this.venta.tiene.length; j++) {
            if (this.venta.tiene[j].codigoProd == code) {
              let cantidad = this.venta.tiene[j].cantidadProd + 1;
              this.modificarCantidadProducto(this.venta.tiene[j].codigoProd,cantidad,this.venta.tiene[j]._id, this.venta.tiene[j].precioProd);
              encontro = true;
            }
            
          }

          if(!encontro){
            console.log('el producto se encontro')
            
            this.tieneArray.nombreProd = this.productosEnco[i].nombreProd,
            this.tieneArray.codigoProd = this.productosEnco[i].codigo,
            this.tieneArray.precioProd = this.productosEnco[i].precio,
            this.tieneArray.cantidadProd = 1,
            this.tieneArray.monto = this.tieneArray.cantidadProd * this.tieneArray.precioProd,
            this.tieneArray.correoEmp = localStorage.getItem('correo');
            this.agregarProductoVenta(this.tieneArray);
            this.consultarVenta();
            break;
          }
        } else {
          console.log('no se encontro')
        }
      
      }
    } else {
      console.log('no se lleno')
    }


    } else {
      console.log('No hay venta')
      this.empleado.correo = localStorage.getItem('correo');
      this.empleadoSer.consultarEmpCorreo(this.empleado).subscribe(res => {
        this.empleado = res;
        //llenamos datos del empleado
        this.ventaSchema.nombreEmp = this.empleado.nombre;
        this.ventaSchema.apellidosEmp = this.empleado.apellidos
        this.ventaSchema.telefonoEmp = this.empleado.telefono
        this.ventaSchema.correoEmp = this.empleado.correo

        this.regVenta();
        
      },
        err => console.log(err))
    }
  }

  consultarVenta() {
    this.filtrosVenta.correoEmp = localStorage.getItem('correo');
    this.ventaSer.buscarVentaPendiente(this.filtrosVenta).subscribe(res => {
      this.venta = res;
      this.obtenerTotal();
    }, err => {
      console.log(err);
    })
  }

  quitarProducto(id, idProd) {
    this.filtroCRUDVenta.id = id;
    this.filtroCRUDVenta.idProd = idProd;

    this.ventaSer.eliminarProducto(this.filtroCRUDVenta).subscribe(res => {
      this.total = 0;
      this.consultarVenta();
    }, err => console.log(err))
  }

  recargarPagina() {
    Swal.fire({
      title: 'Venta realizada correctamente',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Seguir vendiendo'
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    })
  }
  recargarPaginaCanel(){
   
  }

  regVenta() {
    this.ventaSchema.correoEmp = localStorage.getItem('correo');

    this.ventaSer.regVenta(this.ventaSchema).subscribe(res => {
      console.log('venta registrada')
      this.consultarVenta();
    },
      err => console.log(err))
  }

  consultarProductosTodo() {
    this.productoSer.buscarTodo(this.filtrosVenta).subscribe(res => {
      this.productosEnco = res;
    },
      err => console.log(err));
  }

  agregarProductoVenta(producto){
    this.ventaSer.agregarProducto(producto).subscribe(res => {
      this.consultarVenta();
    },
      err => console.log(err));
  }

  obtenerTotal(){
    this.total = 0;
    for (let i = 0; i < this.venta.tiene.length; i++) {
      this.total += this.venta.tiene[i].monto;
      
    }
  }
  modificarCantidadProducto(codigoProd,cantidad,idTiene, precio){
    this.filtrosModificarProd._id = idTiene;
    this.filtrosModificarProd.codigoProd = codigoProd;
    this.filtrosModificarProd.cantidadProd = cantidad;
    this.filtrosModificarProd.monto = cantidad * precio;

    this.ventaSer.modificarProducto(this.filtrosModificarProd).subscribe(res => {
      this.consultarVenta();
    }, err => console.log(err))
  }

  finalizarVenta(){
    this.filtrosVenta.correoEmp = localStorage.getItem('correo');
    this.filtrosVenta.total = this.total;
    
    this.ventaSer.finalizarVenta(this.filtrosVenta).subscribe(res => {
      this.consultarVenta();
    },
    err => console.log(err))
  }

  eliminarVenta(){
    this.consultarVenta();
    Swal.fire({
      title: '¿Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar venta'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'¡Venta cancelada!',
          icon: 'success',
        })
        location.reload();
        
      }
      this.ventaSer.eliminarVenta(this.venta).subscribe(res => {
        this.consultarVenta();
    })
    
    },
    err => console.log(err));
  }
}
