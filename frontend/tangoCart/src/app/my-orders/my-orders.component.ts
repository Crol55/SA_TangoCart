import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { OrderService } from '../servicios/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  
  orders? : any

  constructor(public  orderService: OrderService,
              public  auth : AuthService){ }

  ngOnInit(): void {
    if(this.auth.currentUser != null){ 
      this.getOrders(this.auth.currentUser.id)
    }
  }

  getOrders(id: any){
     this.orderService.getOrderUser(id)
     .subscribe( o =>{ this.orders = o });
  }

  get currentUser() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }


}
