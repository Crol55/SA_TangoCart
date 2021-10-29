import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
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
     addressLine2 : '',
     tipo: ''
  }
  public cart? : any;
  subscription?: Subscription

  constructor(public router: Router,
              public shoppingCartService: ShoppingCardService,
              public OrderService: OrderService,
              public auth :AuthService){}

  async ngOnInit(){
    this.cart =  await this.shoppingCartService.getCart(this.auth.currentUser[0]._id).toPromise();
    console.log(this.cart[0].items)
  
  }
  ngOnDestroy(){
     this.subscription?.unsubscribe();
  }

  async placeOrder(){
     //aqui tendrias que modificar el estado de "tipo" porque aqui se Guarda
     let order = {
       tipo: '',  // aqui se agrega el tipo que me pediste
       user: this.auth.currentUser[0]._id,
       shipping: this.shipping,   
       items: this.cart[0].items
     }
    console.log(order) 
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
