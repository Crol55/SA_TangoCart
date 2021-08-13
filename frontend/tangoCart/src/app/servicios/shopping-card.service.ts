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

  private api = 'http://localhost:3001/api'

  constructor( private http: HttpClient ) { }

  private create() {
     return "shopping Cart"
  }

  addToCart(product: any) {
     
  }

  getCart(id: any): Observable<Cart> {
    const path = `${this.api}/cart/${id}`;
    return  this.http.get<Cart>(path)
  }

}
