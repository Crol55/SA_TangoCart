import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { OrderService } from '../servicios/order.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  
  public shipping = {
     name: '',
     city: '',
     addressLine1 : '',
     addressLine2 : ''
  }
  public cart? : any;
  subscription?: Subscription

  constructor(public router: Router,
              public shoppingCartService: ShoppingCardService,
              public  OrderService: OrderService){}

  async ngOnInit(){
    this.cart =  await this.shoppingCartService.getCart(this.currentCart._id).toPromise();
  
  }
  ngOnDestroy(){
     this.subscription?.unsubscribe();
  }

  async placeOrder(){
     let order = {
       user: this.currentCart.user,
       shipping: this.shipping,
       items: this.cart.items 
     }
    let order$ = await this.OrderService.postOrder(order).toPromise();
    this.shoppingCartService.deleteCart(this.currentCart._id)
    .subscribe( c => {
        localStorage.removeItem('IdCart')
        localStorage.setItem('NoItems',JSON.stringify(0))
    })
    this.router.navigate(['/order-success',order$._id])
    
  }
  get currentCart() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }



}
