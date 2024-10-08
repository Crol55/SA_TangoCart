import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { AuthService } from '../servicios/auth.service';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor( public cartService: ShoppingCardService,
               public auth :AuthService,
               public router: Router ) { }
  
  public shopping? : Observable<Cart> | any;
  public productos? :  any;

  ngOnInit(): void {
    if(this.auth.currentUser != null){
       this.getCart(this.auth.currentUser.id)
    }
  }
  getCart(id: any){
    this.cartService.getCart(id)
    .subscribe( cart => { 
        this.shopping = cart
        this.productos = this.shopping.items
      })
  }
  get currentCart() {
    let token = localStorage.getItem('IdCart')
    if(!token) return null;
    
    return  JSON.parse(token)
  }

  get currentNoItems(){
    let token = localStorage.getItem('NoItems')
    if(!token) return null;
    return  JSON.parse(token)
  }

  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  



}
