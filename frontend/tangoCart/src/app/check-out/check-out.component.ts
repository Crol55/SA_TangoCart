import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { OrderService } from '../servicios/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  tipoEnvio!: String;
  public shipping = {
     name: '',
     city: '',
     addressLine1 : '',
     addressLine2 : '',
     tipo: ''
  }
  public cart? : any;
  subscription?: Subscription

  constructor(public router: Router,
              public shoppingCartService: ShoppingCardService,
              public OrderService: OrderService,
              public auth :AuthService,
              private _snackBar: MatSnackBar){}

  async ngOnInit(){
    this.cart =  await this.shoppingCartService.getCart(this.auth.currentUser.id).toPromise();
    console.log(this.cart[0].items)
  
  }
  ngOnDestroy(){
     this.subscription?.unsubscribe();
  }

  async placeOrder(){
    let precioFinal = 0;
    for(let i = 0; i < this.cart[0].items.length; i++){
      precioFinal += this.cart[0].items[i].precio*this.cart[0].items[i].cantidad;
    }
    //aqui tendrias que modificar el estado de "tipo" porque aqui se Guarda
     let order = {
       user: this.auth.currentUser.id,
       shipping: this.shipping,   
       items: this.cart[0].items,
       tipo: this.tipoEnvio,  // aqui se agrega el tipo que me pediste
       estado: (this.tipoEnvio == 'Envío') ? 'Pedido realizado' : 'En Tienda'
     }
    console.log(order) 
    let order$ = await this.OrderService.postOrder(order).toPromise();
    await this.shoppingCartService.deleteCart(this.currentCart._id).toPromise();
    localStorage.removeItem('IdCart');
    localStorage.setItem('NoItems',JSON.stringify(0));
    if(this.tipoEnvio == "En Tienda"){
      let orderBody = {
        name: this.auth.currentUser[0].nombre,
        lastName: this.auth.currentUser[0].apellido,
        address1: this.shipping.addressLine1, 
        address2: this.shipping.addressLine2, 
        orderID: order$._id, 
        total: (precioFinal + (precioFinal*0.1)), 
        items: this.cart[0].items,
        correo: this.auth.currentUser[0].correo
      }  
      await this.OrderService.postEmail(orderBody).toPromise();
      this._snackBar.open(`Se ha enviado el correo con éxito!`, "Ok", {duration:3500});
    }
    this.router.navigate(['/order-success',order$._id]);
  }
  
  get currentCart() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    return  JSON.parse(token)
  }



}
