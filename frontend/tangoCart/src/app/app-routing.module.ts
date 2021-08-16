import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
   { path: '', component: ProductsComponent},
   { path: 'products', component: ProductsComponent},
   { path: 'shopping-cart', component: ShoppingCartComponent},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent},
   { path: 'my-perfil', component: MyPerfilComponent},
   { path: 'my-orders', component: MyOrdersComponent},
   { path: 'check-out', component: CheckOutComponent },
   { path: 'manage-orders', component: ManageOrdersComponent },
   { path: 'order-success/:id', component: OrderSuccessComponent },
   { path: 'admin/products', component: AdminProductsComponent},
   { path: 'admin/products/new', component: ProductFormComponent},
   { path: 'admin/products/:id', component: ProductFormComponent}
   

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
