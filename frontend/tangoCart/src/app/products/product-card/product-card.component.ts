import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/products';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input('product') product : any;
  constructor() { }

  addToCart(product:any){

    let cartId = localStorage.getItem('cardId');
    if(!cartId){

    }

  }

  ngOnInit(): void {
  }

}
