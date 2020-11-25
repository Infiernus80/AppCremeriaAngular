import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlProductos = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  //Buscar producto por codigo
  consultaCodigo(codigo) {
    return this.http.post<any>(this.urlProductos + '/buscar-prod-codigo', codigo)
  }
  buscarTodo(nada){
    return this.http.post<any>(this.urlProductos + '/productos-venta',nada)
  }


}
