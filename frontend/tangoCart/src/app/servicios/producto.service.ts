import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../models/products';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': this.obtenerAutorizacion
  });
  
  
  private api = 'http://35.192.90.40:3000/api/providers'
  //private api = 'http://localhost:3000/api/providers'
  
  public selectedProduct: Producto = {
    _id: '',
    user: '',
    nombre: '',
    precio: 0,
    descripcion: '',
    categorias: '',
    stock: 0,
    foto: '',
  };
  productos? : Producto[];

  constructor(public http: HttpClient){

        
  }
  
  postProducts(product: any){
    
    if(this.conexion.postProducts !=""){
      const path = this.conexion.postProducts;
      return  this.http.post(path,product,{headers:this.headers})
    }

    const path = `${this.api}/newProduct`;
    return  this.http.post(path,product,{headers:this.headers})
  }

  getProducts() {
    
    if(this.conexion !=null){
      const path = this.conexion.getProducts;
      return  this.http.get<Producto[]>(path,{headers:this.headers})
    }
    const path = `${this.api}/allProducts`;
    return  this.http.get<Producto[]>(path,{headers:this.headers})
  }

  getProduct(id:any): Observable<Producto> {
    const path = `${this.api}/${id}`;
    return this.http.get<Producto>(path)
  }

  getProductUser(id:any) {
    const path = `${this.api}/user/${id}`;
    return this.http.get<Producto[]>(path)
  }

  updateProduct(id : any , product: any){
    const path = `${this.api}/${id}`;
    return this.http.put(path,product)
  }

  delete(id:any){
    const path = `${this.api}/${id}`;
    return this.http.delete(path)
  }

  get obtenerAutorizacion() {
    let token = localStorage.getItem('token')
    if(!token) return null;
    return  JSON.parse(token).token
  }

  get conexion(){
    let conexion = localStorage.getItem('conexion')
    if(!conexion) return null
    return JSON.parse(conexion)
 }

  
}
