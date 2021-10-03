import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/models/categories';
import { CategoriaService } from 'src/app/servicios/categoria.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  public categories$? : Observable<Categoria[]>;
  @Input('categoria') categoria: any;
  constructor(  public categoriaService : CategoriaService) {
    this.categories$ = this.categoriaService.getCategories();
  }

  ngOnInit(): void {
  }

}
