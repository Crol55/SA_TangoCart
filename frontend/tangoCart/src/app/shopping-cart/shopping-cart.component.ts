import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ProductoService } from '../servicios/producto.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor( public cartService: ShoppingCardService,
               public productService: ProductoService) { }
  
  public shopping? : Observable<Cart> | any;

  public productos? : any
  
  public total : number = 0;
  ngOnInit(): void {
    if(this.currentCart != null){
      this.getCart(this.currentCart._id)
   }
  }

  getCart(id: any){
  this.cartService.getCart(id).subscribe( cart => 
    { 
      this.shopping = cart
      this.productos = this.shopping.items
      if(this.productos?.length > 0){
         for(let p of this.productos) { this.total  =  this.total + (p.precio * p.cantidad) }
      }else{
         this.total = 0 
      }
    })
  }
  
  deleteItem(item :any){
    let items = {
       user: "usuario3",
       items: [item],
       state: "active"
    }

    this.cartService.updateCart(items, this.currentCart._id )
    .subscribe( i => {
      this.shopping.cartsItems = i
      localStorage.setItem('IdCart', JSON.stringify(this.shopping.cartsItems['data']))
      let NoItems = 0
      for(let p of this.shopping.cartsItems['data'].items) { 
           NoItems  =  NoItems + p.cantidad
      }
      localStorage.setItem('NoItems',JSON.stringify(NoItems))
      this.getCart(this.currentCart._id)
      this.UpdateStock(item._id,item.cantidad)
    })
    
  }

  UpdateStock(id: any,cantidad : any){
     this.productService.getProduct(id)
     .subscribe( p => {
        let  product = { stock: p.stock + cantidad }
      this.productService.updateProduct(id,product)
      .subscribe( p => {})
     })
  }

  get currentCart() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }



}
