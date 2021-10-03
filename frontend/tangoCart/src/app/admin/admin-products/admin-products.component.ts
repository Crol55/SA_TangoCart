import { Component,AfterViewInit,  ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/products';
import { AuthService } from 'src/app/servicios/auth.service';
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

  
  constructor(private ProductService: ProductoService, 
              public auth: AuthService) {
  
   }
  ngAfterViewInit(): void {
         this.getAll()
  }

  getAll(){
    this.ProductService.getProductUser(this.auth.currentUser[0]._id)
    .subscribe( p => {
      let ELEMENT_DATA: Producto[]  = p ;
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






