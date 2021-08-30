import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-my-perfil',
  templateUrl: './my-perfil.component.html',
  styleUrls: ['./my-perfil.component.css']
})
export class MyPerfilComponent implements OnInit {
  
  imgPreview: string | ArrayBuffer | any
  base64? : string | any 
  ext?:string | any
  ocultar : boolean = true;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }


  actualizar(form: NgForm){

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

  reset(){
    this.imgPreview = null
    this.ocultar = true
  }

}
