import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/products';
import { ShoppingCardService } from 'src/app/servicios/shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input('product') product : any;
  @Input('shopping-cart') shoppingCart : any;
  constructor( ) { }

  ngOnInit(): void {
     
  }



  addToCart(product:any){
    console.log(product)
   }


   
}
