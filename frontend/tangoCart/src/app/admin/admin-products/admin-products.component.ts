import { Component,AfterViewInit,  ViewChild, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/products';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SubastaService } from 'src/app/servicios/subasta.service';
import { Moment } from 'moment';
import * as moment from 'moment';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombre','precio','stock','edit','delete', 'auction'];
  public dataSource : any
  public valor:number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  
  constructor(private ProductService: ProductoService, 
              public auth: AuthService,
              public dialog: MatDialog) {
  
   }
  ngAfterViewInit(): void {
         this.getAll()
  }

  getAll(){
    this.ProductService.getProductUser(this.auth.currentUser.id)
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
  subastar(producto: any){
    const dialogRef = this.dialog.open(DialogSubasta, {
      data: {
        producto: producto
      }
    });    
  }
}


@Component({
  selector: 'mensaje-subasta',
  templateUrl: 'dialog.html',
})
export class DialogSubasta  implements OnInit {
  form = new FormGroup({
    precio: new FormControl('',Validators.required),
    dia: new FormControl('',Validators.required),
    hora: new FormControl('',Validators.required),
    minuto: new FormControl('',Validators.required),
  })

  constructor(public subastaService: SubastaService, public productoServce: ProductoService, public dialogRef: MatDialogRef<DialogSubasta>, @Inject(MAT_DIALOG_DATA) public data:any, private snack_bar: MatSnackBar, public auth :AuthService) {
  }
  ngOnInit(): void {
    this.form.setValue({
      precio: 0,
      dia: 0,
      hora: 12,
      minuto: 0
    });
  }

  async finalizar(){
    if(parseInt(this.data.producto.stock) > 0){
      if(parseInt(this.form.value.dia) < 0 || parseInt(this.form.value.hora) < 0 || parseInt(this.form.value.minuto) < 0){
        this.snack_bar.open("No se aceptan valores negativos!", "Ok", {duration:2500});
      }
      else{
        let now = new Date();
        now = moment(now).add(parseInt(this.form.value.dia), "d").toDate();
        now = moment(now).add(parseInt(this.form.value.hora), "h").toDate();
        now = moment(now).add(parseInt(this.form.value.minuto), "m").toDate();
  
        let subasta = {
          propietario: this.auth.currentUser[0]._id,
          usuarios: this.auth.currentUser[0]._id,
          products: this.data.producto._id,
          estado: "Activa",
          oferta: this.form.value.precio,
          fecha_final: now
        }
  
        this.subastaService.postSubasta(subasta).subscribe(result =>{
          this.snack_bar.open("Se ha creado la subasta con éxito!", "Ok", {duration:2500});
        });
  
        this.data.producto.stock = parseInt(this.data.producto.stock) - 1;
        this.productoServce.updateProduct(this.data.producto._id,this.data.producto).subscribe(p => {
          console.log(p);
        })
      }
    }
    else{
      this.snack_bar.open("Producto con stock vacío!", "Ok", {duration:2500});
    }
    this.dialogRef.close();
  }
}




