import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ShoppingCardService } from '../servicios/shopping-card.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor( public cardService: ShoppingCardService) { }
  
  public shopping? : Observable<Cart> | any;

  public productos? : any
  
  public total : number = 0;

  ngOnInit(): void {
    this.getCart("6115d09ea098037dc88ee7ba")
  }
  getCart(id: any){
    this.cardService.getCart(id).subscribe( cart => 
      { 
        this.shopping = cart
        this.productos = this.shopping.items
        for(let p of this.productos) { this.total  =  this.total + (p.precio * p.cantidad) }
      })
  }

}
