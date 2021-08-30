import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categories';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  public categories$? : Observable<Categoria[]>;
  @Input('categoria') categoria: any;
  constructor(  public categoriaService : CategoriaService) {
    this.categories$ = this.categoriaService.getCategories();
   }

  ngOnInit(): void {
  }

}
