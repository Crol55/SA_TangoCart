import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent, DialogSubasta } from './admin/admin-products/admin-products.component';
import { CategoriaService } from './servicios/categoria.service';
import { ProductoService } from './servicios/producto.service';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from './servicios/dialog.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ShoppingCardService } from './servicios/shopping-card.service';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderService } from './servicios/order.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ShoppingCartSumaryComponent } from './shopping-cart-sumary/shopping-cart-sumary.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ListaDeseosComponent } from './lista-deseos/lista-deseos.component';
import { ListaDeseosService } from './servicios/lista-deseos.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    MyPerfilComponent,
    ProductFormComponent,
    AdminProductsComponent,
    DialogSubasta,
    DialogComponent,
    ProductFilterComponent,
    ProductCardComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    ShoppingCartSumaryComponent,
    MyOrdersComponent,
    ManageOrdersComponent,
    ListaDeseosComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    DataTablesModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents:[
      DialogComponent
  ],
  providers: [
    CategoriaService,
    ProductoService,
    ShoppingCardService,
    DialogService,
    { provide: DialogService, useClass: DialogService },
    OrderService,
    OverlayModule, 
    ListaDeseosService
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
