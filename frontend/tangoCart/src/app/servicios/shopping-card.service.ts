import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {
  
  public selectedCart: Cart = {
    _id: '',
    user: '',
    state: '',
    items: []
  };

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'token': this.obtenerAutorizacion
  });

  private api = 'http://35.192.90.40:3001/api'
  //private api = 'http://localhost:3001/api'
  public cartsItems?: any;

  constructor( private http: HttpClient ) { }


  addToCart(product: any) {

    const path = `${this.api}/cart`;
    return  this.http.post(path, product)
  }

  getCart(id: any): Observable<Cart> {
   
    const path = `${this.api}/cart/${id}`;
    return  this.http.get<Cart>(path)
  }

  updateCart(items: any, id: any){
    console.log(id)
    const path = `${this.api}/cart/${id}`;
    return  this.http.put(path, items) 
  }
   
  deleteCart( id: any){
    console.log(id)
    const path = `${this.api}/cart/${id}`;
    return  this.http.delete(path) 
  }

  comprar(compra: any){
    if(this.conexion.postCompra !=""){
      console.log(this.obtenerAutorizacion)
      const path = this.conexion.postCompra;

      return  this.http.post(path,compra,{headers:this.headers}) 
    }
    const path = `${this.api}/users/compra`;
    return  this.http.post(path,compra,{headers:this.headers})
  }

  get conexion(){

    let conexion = localStorage.getItem('conexion')
    if(!conexion) return null
    return JSON.parse(conexion)
 }

 
 get obtenerAutorizacion() {
  let token = localStorage.getItem('token')
  if(!token) return null;
  return  JSON.parse(token).token
}

}
