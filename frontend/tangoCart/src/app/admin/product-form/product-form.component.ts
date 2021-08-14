import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categories';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers:[CategoriaService, ProductoService]
})
export class ProductFormComponent implements OnInit{
  
  imgPreview: string | ArrayBuffer | any
  base64? : string | any 
  ext?:string | any
  ocultar : boolean = true;
  categories$?: Observable<Categoria[]>;;
  product? : any;  
  id : any;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private Categoryservice: CategoriaService, 
    public  Productservice: ProductoService,
    public  dialog: MatDialog ){
    this.categories$ = this.Categoryservice.getCategories();
                    
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) this.Productservice.getProduct(this.id).subscribe(p => this.Productservice.selectedProduct = p )
   }



  ngOnInit(): void {
    
  }
 
  openDialog(message: any) {
    this.dialog.open(DialogComponent, {
      data: { message: message }
    } )
    .afterClosed()
  }

  async save(product:any){
    if(this.id){ 
      let producto = {
          nombre : product.nombre,
          precio : product.precio,
          descripcion: product.descripcion,
          categoria: product.categoria,
          stock: product.stock,
      }
      this.Productservice.updateProduct(this.id,producto)
      .subscribe(p => {
        this.openDialog("Producto Actualizado exitosamente!!")
      })
      this.router.navigate(['/admin/products'])
     }else if(this.base64)
         {
            let saveProduct = {
                titulo: product.nombre,
                precio: product.precio,
                descripcion: product.descripcion,
                categoria:product.categoria,
                stock: product.stock,
                foto: this.base64,
                ext: this.ext
            }
             this.Productservice.postProducts(saveProduct)
            .subscribe(result => {
              this.openDialog("Producto Agregado exitosamente!!")
              this.router.navigate(['/admin/products'])
            })
        }else{
          this.openDialog("Error Verifique La Información")
        }

    

  }

  delete(){

  }

  public subirImagen(event: any){
    
    this.ocultar = false;
    
    const file = event.target.files[0];
    let name = event.target.files[0].name;
    let lastDot = name.lastIndexOf('.');
    let fileName = name.substring(0, lastDot);
    this.ext = "."+name.substring(lastDot + 1);

    const reader = new FileReader();
    reader.onload = e => this.imgPreview = reader.result;
    reader.onloadend = () => {
      const base64String  =  reader.result?.slice(22)
      this.base64 = base64String?.toString()
    };
    reader.readAsDataURL(file);
  }

 

}
