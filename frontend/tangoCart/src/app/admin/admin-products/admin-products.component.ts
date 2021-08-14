import { Component,AfterViewInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/products';
import { ProductoService } from 'src/app/servicios/producto.service';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre','precio','stock','edit','delete'];
  public dataSource : any
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  
  constructor(private ProductService: ProductoService ) {
  
   }
  ngAfterViewInit(): void {
         this.getAll()
  }

  getAll(){
    this.ProductService.getProducts()
    .subscribe( p => {
      let ELEMENT_DATA :Producto[]  = p ;
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })

  }
  delete(id: any){
      this.ProductService.delete(id)
      .subscribe( p => {
         this.getAll()
      })
  }
}






