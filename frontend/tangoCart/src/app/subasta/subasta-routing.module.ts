import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    children: []
  },
  { 
    path: 'producto', 
    component: ProductoComponent, 
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubastaRoutingModule { }
