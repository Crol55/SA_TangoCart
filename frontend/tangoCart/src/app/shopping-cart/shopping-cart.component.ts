import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { AuthService } from '../servicios/auth.service';
import { ProductoService } from '../servicios/producto.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ShoppingCardService,ProductoService]
})
export class ShoppingCartComponent implements OnInit {

  constructor( public cartService: ShoppingCardService,
               public productService: ProductoService,
               public auth : AuthService) { }
  
  public shopping? : Observable<Cart> | any;

  public productos? : any
  
  public total : number = 0;
  ngOnInit(): void {
    if(this.auth.currentUser != null){
      this.getCart(this.auth.currentUser[0]._id)
    }
  }

  getCart(id: any){
  this.cartService.getCart(id)
  .subscribe(cart => 
    { 
      this.shopping = cart
     
      this.productos = this.shopping[0].items 
      if(this.productos?.length > 0){
         for(let p of this.productos) { this.total  =  this.total + (p.precio * p.cantidad) }
         console.log(this.total)   
      }else{
         this.total = 0 
      }
    })
  }
  
  deleteItem(item :any){
    let items = {
       user:  this.currentCart._id,
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
      this.getCart(this.auth.currentUser[0]._id)
      this.UpdateStock(item._id,item.cantidad)
      this.total = 0;
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
