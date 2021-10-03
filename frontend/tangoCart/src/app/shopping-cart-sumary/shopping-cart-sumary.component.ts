import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { AuthService } from '../servicios/auth.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'shopping-cart-sumary',
  templateUrl: './shopping-cart-sumary.component.html',
  styleUrls: ['./shopping-cart-sumary.component.css']
})
export class ShoppingCartSumaryComponent implements OnInit  {
  
  public shopping? : Observable<Cart> | any;

  public productos? : any
  
  public total : number = 0;


  constructor(public cartService: ShoppingCardService,
              public auth : AuthService){
    
  }
  

  ngOnInit() :void {
    if(this.auth.currentUser != null){
      this.getCart(this.auth.currentUser[0]._id)
    }
  }

  getCart(id: any){
    this.cartService.getCart(id).subscribe( cart => 
      { 
        this.shopping = cart
        
        this.productos = this.shopping[0].items
        if(this.productos?.length > 0){
           for(let p of this.productos) { this.total  =  this.total + (p.precio * p.cantidad) }
        }else{
           this.total = 0 
        }
      })
    }

  get currentCart() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }

  get currentItems() {
    let token = localStorage.getItem('NoItems')
    if(!token) return null;
    return  JSON.parse(token)
  }

}
