import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categories';
import { Producto } from '../models/products';
import { CategoriaService } from '../servicios/categoria.service';
import { ProductoService } from '../servicios/producto.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products?: Producto[] = [];
  public filteredProducts? : Producto[] = []; 
  
  public categoria?: string | null;

  constructor(
    public route: ActivatedRoute,
    public productService: ProductoService, 
   ) {
       
    this.productService
    .getProducts().subscribe(p => {  
      this.products = p
      
      route.queryParamMap.subscribe(params =>{
        this.categoria = params.get('categoria');
        
        this.filteredProducts = (this.categoria) ?
        this.products?.filter(p => p.categoria == this.categoria) : this.products
      });
  
    });

   
   
    
  
    

   
  
    }

    

  ngOnInit(): void {
    
  

  }
}
