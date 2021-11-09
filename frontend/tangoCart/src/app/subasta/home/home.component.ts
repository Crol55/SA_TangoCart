import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { SubastaService } from 'src/app/servicios/subasta.service';
import { Subasta } from 'src/app/models/subasta';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { ShoppingCardService } from 'src/app/servicios/shopping-card.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public subastas : Subasta[] = [];
  public filteredAuctions? : Subasta[] = [];
  public categoria?: string | null;

  constructor(public auth :AuthService, public route: ActivatedRoute, public categoriaService : CategoriaService, public subastaService: SubastaService) {
    this.subastaService.getSubastas().subscribe(subasta => {
      this.subastas = subasta;        
      route.queryParamMap.subscribe(params =>{
        this.categoria = params.get('categoria');
        this.filteredAuctions = (this.categoria) ? this.subastas.filter(item => item.products.categorias == this.categoria) : this.subastas;
      });
    });
  }

  ngOnInit(): void {
    //console.log(this.auth.currentUser);
  }

}
