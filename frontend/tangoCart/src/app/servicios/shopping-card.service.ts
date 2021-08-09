import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor() { }

  private create() {
     return "shopping Cart"
  }

  addToCart(product: any) {
     
  }

}
