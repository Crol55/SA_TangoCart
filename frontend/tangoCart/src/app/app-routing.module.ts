import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthGuardService } from './Guard/guard';
import { AuthGuardService2 } from './Guard/guard2';
import { LoginComponent } from './login/login.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyPerfilComponent } from './my-perfil/my-perfil.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ListaDeseosComponent} from './lista-deseos/lista-deseos.component';

 export const routes: Routes = [
   { path: '', component: LoginComponent,  canActivate: [AuthGuardService2]  },
   { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },
   { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuardService] },
   { path: 'login', component: LoginComponent, canActivate: [AuthGuardService2]},
   { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService2]},
   { path: 'my-perfil', component: MyPerfilComponent, canActivate: [AuthGuardService]},
   { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuardService]},
   { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService] },
   { path: 'manage-orders', component: ManageOrdersComponent, canActivate: [AuthGuardService] },
   { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService] },
   { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService]},
   { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService]},
   { path: 'admin/products/:id', component: ProductFormComponent,canActivate: [AuthGuardService] },
   { path: 'client/Wishlist', component: ListaDeseosComponent },   
   { path: 'auction', loadChildren: () => import('./subasta/subasta.module').then(x => x.SubastaModule)}

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
