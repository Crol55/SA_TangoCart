import { Component, OnInit } from '@angular/core';
import { OrderService } from '../servicios/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  orders? : any

  constructor(public  orderService: OrderService){ }

  ngOnInit(): void {
     this.getOrders()
  }

  getOrders(){
     this.orderService.getOrders()
     .subscribe( o =>{
         this.orders = o
         console.log(this.orders)
     });
  }

}
