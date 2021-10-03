import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private api = 'http://34.69.63.86:3000/api'
  //private api = 'http://localhost:3000/api'
  
  public selectedProduct: Producto = {
    _id: '',
    user: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    categoria: '',
    stock: 0,
    foto: '',
  };
  productos? : Producto[];

  constructor(private http: HttpClient){
  }
  
  postProducts(product: any){
    const path = `${this.api}/product`;
    return  this.http.post(path,product)
  }

  getProducts() {
    const path = `${this.api}/product`;
    return  this.http.get<Producto[]>(path)
  }

  getProduct(id:any): Observable<Producto> {
    const path = `${this.api}/product/${id}`;
    return this.http.get<Producto>(path)
  }

  getProductUser(id:any) {
    const path = `${this.api}/product/user/${id}`;
    return this.http.get<Producto[]>(path)
  }

  updateProduct(id : any , product: any){
    const path = `${this.api}/product/${id}`;
    return this.http.put(path,product)
  }

  delete(id:any){
    const path = `${this.api}/product/${id}`;
    return this.http.delete(path)
  }
  

  
}
