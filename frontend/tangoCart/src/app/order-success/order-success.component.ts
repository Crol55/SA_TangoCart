import { Component, ViewChild, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Order } from '../models/order';
import { OrderService } from '../servicios/order.service';
import { faHtml5, faCss3, faJs, faAngular } from '@fortawesome/free-brands-svg-icons';
import { faHome, faDolly, faTruck, faClipboardCheck, faBoxOpen, faBox } from '@fortawesome/free-solid-svg-icons';


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

  faHtml5 = faHtml5;
  faCss3 = faCss3;
  faJs = faJs;
  faAngular = faAngular;

  faBoxOpen = faBoxOpen; //Order is placed
  faClipboardCheck = faClipboardCheck; //Need approval
  faBox = faBox; //packed
  faTruck = faTruck; //Shipped
  faHome = faHome; //delivered 

  faDolly = faDolly; //In transit

  @ViewChild('progress') progress!: ElementRef;
  //@ViewChild('prev') prev!: ElementRef;
  //@ViewChild('next') next!: ElementRef;
  @ViewChildren('circle') circles!: QueryList<ElementRef>;
  @ViewChildren('fa') fa!: QueryList<ElementRef>;
  @ViewChildren('active') active!: QueryList<ElementRef>;
  currentActive:number = 1;
  data:any;
  constructor(
    private route: ActivatedRoute,
    public  orderService: OrderService,
    private renderer: Renderer2, 
    private elem: ElementRef
    ) {
      this.getorder()
    }
    
    public total : number = 0;
    ngOnInit(): void {
      
    }

   async getorder(){
    this.id = this.route.snapshot.paramMap.get('id')
    this.orderService.getOrder(this.id).subscribe( async o => { 
        this.usuario = o.shipping  
        this.nombre = this.usuario.name
        this.city = this.usuario.city
        this.add1 = this.usuario.addressLine1
        this.add2 = this.usuario.addressLine2
        this.orden = o.items
        this.serie = o._id
        this.fecha = o.createdAt
        this.data = o.estado;

        let contador = (this.data=="Pedido realizado") ? 0 : (this.data=="Necesita aprobación") ? 1 : (this.data=="Empacado") ? 2 : (this.data=="Enviado") ? 3 : (this.data=="Entregado") ? 4 : -1;
        for(let i = 0; i<contador; i++){
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.increase();
        }

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

  increase(){
    this.currentActive++;
    if(this.currentActive > this.circles.length){
      this.currentActive = this.circles.length;
    }
    //console.log(this.currentActive);
    this.update();
  }

  decrease(){
    this.currentActive--;
    if(this.currentActive < 1){
      this.currentActive = 1;
    }
    //console.log(this.currentActive);
    this.update();
  }

  update(){
    this.circles.forEach((circle, index)=>{
      if(index < this.currentActive){
        this.renderer.addClass(circle.nativeElement, 'active');
      }
      else{
        this.renderer.removeClass(circle.nativeElement, 'active');
      }
    });

    this.fa.forEach((fa, index)=>{
      if(index < this.currentActive){
        this.renderer.addClass(fa.nativeElement, 'icono');
      }
      else{
        this.renderer.removeClass(fa.nativeElement, 'icono');
      }
    });

    const act = this.elem.nativeElement.querySelectorAll('.active');
    this.progress.nativeElement.style.width = (( (act.length-1) / (this.circles.length - 1 )) * 100) + "%";
    //console.log(( (act.length-1) / (this.circles.length - 1 )) * 100);
    //console.log(this.currentActive,this.circles.length, act.length);
    /*
    if(this.currentActive === 1){
      this.prev.nativeElement.disabled = true;
    }
    else if(this.currentActive === this.circles.length){
      this.next.nativeElement.disabled = true;
    }
    else{
      this.prev.nativeElement.disabled = false;
      this.next.nativeElement.disabled = false;
    }
    */
  }



  

}
