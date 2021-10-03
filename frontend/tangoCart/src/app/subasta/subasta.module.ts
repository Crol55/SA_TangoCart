import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubastaRoutingModule } from './subasta-routing.module';
import { HomeComponent } from './home/home.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ProductoComponent, DialogMessage } from './producto/producto.component';
import { FiltroComponent } from './filtro/filtro.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    DetalleComponent,
    ProductoComponent,
    DialogMessage,
    FiltroComponent
  ],
  imports: [
    CommonModule,
    SubastaRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SubastaModule { }
