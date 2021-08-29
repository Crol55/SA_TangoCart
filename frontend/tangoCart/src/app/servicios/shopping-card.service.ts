import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  private api = 'http://34.69.63.86:3001/api'
  
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
    const path = `${this.api}/cart/${id}`;
    return  this.http.put(path, items) 
  }
   
  deleteCart( id: any){
    const path = `${this.api}/cart/${id}`;
    return  this.http.delete(path) 
  }


}
