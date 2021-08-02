import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'products', component: ProductsComponent},
   { path: 'shopping-cart', component: ShoppingCartComponent},
   { path: 'login', component: LoginComponent},
   { path: 'register', component: RegisterComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
