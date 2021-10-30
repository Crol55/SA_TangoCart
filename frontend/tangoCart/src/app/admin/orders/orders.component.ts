import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/servicios/order.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['ID', 'Productos', 'Direcciones', 'Tipo', 'Total', 'Editar'];
  dataSource !: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public orderService: OrderService, private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.orderService.getAllOrders().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  total(arreglo:any){
    let total = 0;
    arreglo.forEach((element: any) => {
      total += element.precio;
    });
    return total;
  }

  changeStatus(status:any,order:any){

    this.orderService.putOrder(order, status).subscribe(msg=>{
      this._snackBar.open(`La orden: ${order} se actualizó con éxito!`, "Ok", {duration:3500});
    });
    
  }

}

