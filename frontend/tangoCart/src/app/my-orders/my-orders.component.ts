import { Component, OnInit } from '@angular/core';
import { OrderService } from '../servicios/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  
  orders? : any

  constructor(public  orderService: OrderService){ }

  ngOnInit(): void {
    if(this.currentUser != null){ 
      this.getOrders(this.currentUser.user)
    }
  }

  getOrders(id: any){
     this.orderService.getOrder(id)
     .subscribe( o =>{ this.orders = o });
  }

  get currentUser() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }


}
