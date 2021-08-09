import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/products';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$? : Observable<Producto[]> 
  constructor(private ProductService: ProductoService ) {     
    this.products$ = this.ProductService.getProducts()
  }

  ngOnInit(): void {
  }

}
