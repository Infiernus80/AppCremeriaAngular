import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  urlVenta = 'http://localhost:3000/ventas'

  constructor(private http: HttpClient) { }

  consultarTodo(){
    return this.http.get(this.urlVenta);
  }
  regPedido(pedido){
    return this.http.post<any>(this.urlVenta, pedido)
  }
  //agrega un producto a la venta 
  agregarProducto(venta){
    return this.http.post<any>(this.urlVenta + '/agregar-producto', venta);
  }

  //eliminar un producto del pedido en el arreglo tiene
  eliminarProducto(venta){
    return this.http.post<any>(this.urlVenta + '/eliminar-producto', venta);
  }

  eliminarPedido(venta){
    return this.http.post<any>(this.urlVenta + '/eliminar', venta);
  }

  //consultar si hay una venta pendiente de algun empleado
  buscarVentaPendiente(datos){
    return this.http.post<any>(this.urlVenta + '/buscar-venta-pendiente', datos);
  }

  //consultar si un producto ya esta registrado en la venta
  buscarProductoCarrito(pedido){
    return this.http.post<any>(this.urlVenta + '/buscar-producto-venta', pedido);
  }



}
