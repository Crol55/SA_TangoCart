import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/products';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public EndPoint = {
     getAll : "",
     postProduct: ""
  }
  
  headers = new HttpHeaders({
     'token': this.obtenerAutorizacion
  });
  
  
  //private api = 'http://35.192.90.40:3000/api'
  private api = 'http://localhost:3000/api'
  
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
    if(this.EndPoint.postProduct !=""){
      const path = this.EndPoint.postProduct;
      return  this.http.post(path,product,{headers:this.headers})
    }

    const path = `${this.api}/product`;
    return  this.http.post(path,product,{headers:this.headers})
  }

  getProducts() {
   
    if(this.EndPoint.getAll !=""){
      const path = this.EndPoint.getAll;
      return  this.http.get<Producto[]>(path,{headers:this.headers})
    }
    const path = `${this.api}/product`;
    return  this.http.get<Producto[]>(path,{headers:this.headers})
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

  get obtenerAutorizacion() {
    let token = localStorage.getItem('token')
    if(!token) return null;
    return  JSON.parse(token).Token
  }

  
}
