import { Component, OnInit } from '@angular/core';
import { BeepService } from './beep.service';
import Quagga from 'quagga';
import { Productos } from './articulo';
import { ShoppingCart } from './shopping-cart';

//Servicio
import {ProductoService} from 'src/app/servicio/producto.service';
import {VentaService} from 'src/app/servicio/venta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  constructor(private beepService: BeepService,private Producto:ProductoService,private Venta:VentaService) {
  }
  ngOnInit(): void {
    this.consultarCarrito(); 
  }
  private lastScannedCode:string;
  private lastScannedCodeDate: number;
  errorMessage: string;

  carrito;
  total = 0;

  filtrosCarrito = {
    correoEmp : ''
  }
  productosInfo = [{
    cantidadProd : 0,
    monto : 0,
    idProductoCarrito: '',
  }];
  filtroCRUDVenta = {
    idProd:'',
    id: ''
  }
  
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

    //  ignore unknown articles
    //   const article = this.productosInfo[].idProductoCarrito === this.lastScannedCode;
    //  if (!article) {
    //    return;
    //  }

    // this.shoppingCart.addArticle(this.producto);
    this.prod();
    this.lastScannedCode = code;
    this.lastScannedCodeDate = now;
    this.beepService.beep();
    // this.changeDetectorRef.detectChanges();
  }

  consultarCarrito(){
    const correo = localStorage.getItem('correo');
    this.Venta. buscarVentaPendiente(correo).subscribe(res => {
      this.carrito = res;
      this.prod();
      console.log('termino de llenarse, el resultado es:');
      console.log(this.productosInfo);
    },err => {
      console.log(err);
    })
  }

  prod(){
    for (let i = 0; i < this.carrito.tiene.length; i++) {
      this.Producto.consultaCodigo(this.lastScannedCode).subscribe(res => {
       // console.log('Producto: ' + i)
        //console.log(res);
        this.productosInfo[i] = res;
        this.productosInfo[i].cantidadProd = res;
        this.productosInfo[i].monto = res;
        this.productosInfo[i].idProductoCarrito = res;
        this.filtroCRUDVenta.id = this.carrito._id;
        this.total += this.productosInfo[i].monto; 
      });    
    }
  }
  quitarProducto(id){
    this.filtroCRUDVenta.idProd = id;

    this.Venta.eliminarProducto(this.filtroCRUDVenta).subscribe(res => {
      this.total = 0;
      this.consultarCarrito();
    }, err => console.log(err))
  }
  
  recargarPagina(){
    location.reload();
  }

}
