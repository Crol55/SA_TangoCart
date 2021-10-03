import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { OrderService } from '../servicios/order.service';



@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  
  @ViewChild('htmlData', {static:false }) htmlData?:ElementRef;
  public shopping? : Observable<Cart> | any;
  id : any;
  public productos? : any
  orden : any | "";
  usuario:  Observable<Order> | any; 
  serie: any;

  nombre: any; 
  city: any;
  add1: any;
  add2: any;
  fecha: any;
  constructor(
  
    private route: ActivatedRoute,
    public  orderService: OrderService) {
      this.getorder()
    }
  
    public total : number = 0;
    ngOnInit(): void {
      
    }

   async getorder(){
    this.id = this.route.snapshot.paramMap.get('id')
    this.orderService.getOrder(this.id).subscribe( o => { 
        this.usuario = o.shipping  
        this.nombre = this.usuario.name
        this.city = this.usuario.city
        this.add1 = this.usuario.addressLine1
        this.add2 = this.usuario.addressLine2
        this.orden = o.items
        this.serie = o._id
        this.fecha = o.createdAt

        if(this.orden.length > 0){
          for(let p of this.orden) { this.total  =  this.total + (p.precio * p.cantidad) }
       }else{
        this.total = 0 
       }
     })
    }
  
   


  public openPDF():void {
   let margins = {
      top: 80,
      bottom: 60,
      left: 40,
      width: 522
     }; 
    let DATA = this.htmlData?.nativeElement;
    let doc = new jsPDF('p','pt','a4');
    doc.html(DATA, {
      margin:50,
      callback: function (doc) {
        doc.save("factura.pdf");
      }
      
   });
  }




  

}
