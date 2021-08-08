import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { LoginComponent } from './login/login.component';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';
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
   { path: 'admin/products', component: AdminProductsComponent},
   { path: 'admin/products/new', component: ProductFormComponent},
   { path: 'admin/products/:id', component: ProductFormComponent}
   

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
