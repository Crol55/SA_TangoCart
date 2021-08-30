import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Producto } from 'src/app/models/products';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ShoppingCardService } from 'src/app/servicios/shopping-card.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  
  @Input('product') product : any;
  @Input('shopping-cart') shoppingCart : any;

  public cantidad? : number = 1
  public producto?  : Producto;
  
  constructor(public shopping:ShoppingCardService,
              public ProductService: ProductoService,
              public  dialog: MatDialog,
              public auth : AuthService) { }
  ngOnInit(): void {
     
  }
  addToCart(product:any){
     this.ProductService.getProduct(product?._id)
     .subscribe(p => {
    if(p.stock == 0) { this.openDialog("Inventario Vacio, Intentelo más tarde") }
    else {
    let items = {
         user:this.auth.currentUser[0]._id,
         state: "active",
         items: [{_id: product?._id,
                  nombre: product?.nombre,
                  precio: product?.precio,
                  stock : product?.stock,
                  foto: product?.foto, 
                  cantidad: this.cantidad
                }]
    }

    this.shopping.addToCart(items)
     .subscribe( i => { 
         this.shopping.cartsItems = i
         localStorage.setItem('IdCart', JSON.stringify(this.shopping.cartsItems['data']))
         let NoItems = 0
         for(let p of this.shopping.cartsItems['data'].items) { 
              NoItems  =  NoItems + p.cantidad
         }
         localStorage.setItem('NoItems',JSON.stringify(NoItems))
    })
    this.UpdateStock(product._id, product.stock)
    } //fin validar stock 

  }) // validar stock 
   }

   UpdateStock(id: any, stock: any ){
      this.ProductService.getProduct(id)
      .subscribe( p => {
        let st = {
          stock : p.stock - 1
        }
        this.ProductService.updateProduct(id,st)
        .subscribe( p => {
        }) 
      })
   }

    
  openDialog(message: any) {
    this.dialog.open(DialogComponent, {
      data: { message: message }
    } )
    .afterClosed()
  }



   
}
