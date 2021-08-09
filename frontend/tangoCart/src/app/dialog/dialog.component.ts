import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  
  message : string | any
  constructor(@Inject(MAT_DIALOG_DATA) data: any ) { 
     this.message = data.message
   }

  ngOnInit(): void {
  }

}
