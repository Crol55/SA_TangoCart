import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Producto } from 'src/app/models/products';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ShoppingCardService } from 'src/app/servicios/shopping-card.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  
  @Input('subasta') subasta : any;

  public cantidad? : number = 1
    
  constructor(public  dialog: MatDialog, public auth : AuthService, private router: Router) { }
  ngOnInit(): void {
    //console.log(this.subasta);

    //console.log(countdown(new Date(this.subasta.fecha_inicial), new Date(this.subasta.fecha_final)));
  }

  comprobarfecha(){
    const now = new Date();
    //return new Date(this.subasta.fecha_inicial);

    if(now < new Date(this.subasta.fecha_final)){
      return `${new Date(this.subasta.fecha_final).toLocaleString()}`;
    }
    else{
      return `La subasta ya finalizó!`;
    }
  }

  formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  ofertar(){    
    this.router.navigate(['/auction','producto'],  { queryParams: { _id: this.subasta._id }});
  }
    
  openDialog(message: any) {
    this.dialog.open(DialogComponent, {
      data: { message: message }
    } )
    .afterClosed()
  }

  comprobar(id:any){
    if(id == this.auth.currentUser[0]._id){
      return '✅';
    }
    else{
      return '';  
    }
  }

}