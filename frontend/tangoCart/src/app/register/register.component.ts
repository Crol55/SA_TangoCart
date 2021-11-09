
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  imgPreview: string | ArrayBuffer | any
  base64? : string | any 
  ext?:string | any
  ocultar : boolean = true;
  constructor(public router : Router,
             public  auth: AuthService  ) { }

  ngOnInit(): void {
  }

  registrar( form: NgForm){
   
   let usuario = {
         nombre: form.value.nombre,
         apellido: form.value.apellido,
         tipo: form.value.tipo,
         correo: form.value.correo,
         password: form.value.password,
         tarjetas: [{
           titular: form.value.titular,
           numero:  form.value.tarjeta,
           vencimiento: form.value.fechav
         }]
        
    }
    console.log(usuario)

    if(form.value.tipo == 'c'){
        this.auth.postUsuario(usuario)
        .subscribe( u =>{ 
          console.log(u)
          this.router.navigate(['/login'])
        })
    }else{
      this.auth.postUsuario2(usuario)
      .subscribe( u =>{ console.log(u) 
      this.router.navigate(['/login'])
    })
    }
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
