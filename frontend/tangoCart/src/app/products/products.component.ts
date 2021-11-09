import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Producto } from '../models/products';
import { AuthService } from '../servicios/auth.service';
import { ProductoService } from '../servicios/producto.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductoService]
})
export class ProductsComponent implements OnInit {

  public products?: Producto[] = [];
  public filteredProducts? : Producto[] = []; 
  public shopping? : Observable<Cart> | any;
  public categorias: any ;

  constructor(
    public route: ActivatedRoute,
    public productService: ProductoService, 
    public cartService: ShoppingCardService,
    public auth :AuthService
   ) {
       
    this.productService
    .getProducts().subscribe(p => {  
      this.products = p
      route.queryParamMap.subscribe(params =>{
        this.categorias = params.get('categorias');
        this.filteredProducts = (this.categorias) ?
        this.products?.filter(p => p.categorias[0] == this.categorias) : this.products
      });
  
    });

    }

    
  ngOnInit(): void {
    this.getCart(this.auth.currentUser.id)

  }

  getCart(id: any){
    this.cartService.getCart(id)
    .subscribe(cart => 
    { 
     
      this.shopping = cart
      let NoItems = 0
      localStorage.setItem('IdCart', JSON.stringify(this.shopping))
      if (!this.shopping[0]) return
      for(let p of this.shopping[0].items) { 
           NoItems  =  NoItems + p.cantidad
      }
      localStorage.setItem('NoItems',JSON.stringify(NoItems))
     },err =>{
      localStorage.setItem('NoItems',JSON.stringify(0))
     })
    }
}
