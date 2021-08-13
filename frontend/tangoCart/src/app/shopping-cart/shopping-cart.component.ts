import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor( public cardService: ShoppingCardService) { }
  
  public shopping? : Observable<Cart> | any;

  public productos? : any
  
  public total : number = 0;
  ngOnInit(): void {
    this.getCart("6115d09ea098037dc88ee7ba")
  }

  getCart(id: any){
  this.cardService.getCart(id).subscribe( cart => 
    { 
      this.shopping = cart
      this.productos = this.shopping.items
      for(let p of this.productos) { this.total  =  this.total + (p.precio * p.cantidad) }
    })
  
 }


}
