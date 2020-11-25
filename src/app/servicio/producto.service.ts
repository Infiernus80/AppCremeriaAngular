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
  buscarCodigo(producto) {
    return this.http.post<any>(this.urlProductos + "/buscar-prod-codigo", producto);
  }
  //consulta todo sin necesidad de async
  buscarTodoSA(nada) {
    return this.http.post<any>(this.urlProductos + '/buscar-todo', nada);
  }


}
