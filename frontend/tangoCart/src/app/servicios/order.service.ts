import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private api = 'http://localhost:3001/api'

  constructor(private http: HttpClient) { }

  postOrder(order: any): Observable<Order> {
    const path = `${this.api}/order`;
    return  this.http.post<Order>(path,order)
  }

  getOrders(): Observable<Order>  {
    const path = `${this.api}/order`;
    return  this.http.get<Order>(path)
  }

  getOrder(id:any): Observable<Order> {
    const path = `${this.api}/order/${id}`;
    return this.http.get<Order>(path)
  }


}
