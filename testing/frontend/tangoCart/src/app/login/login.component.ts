import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  form = new FormGroup({
    correo:    new FormControl('',Validators.required), 
    password: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required),
  })
  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

 get correo(){
   return this.form.get("correo")
 }

 get password(){
   return this.form.get('password')
 }

 get tipo(){
  return this.form.get('tipo')
}

 login(){
     if(this.form.valid){

        if(this.tipo?.value == 'c'){
            this.auth.login(this.form.value)
            .subscribe( usuario =>{
              
                localStorage.setItem('token', JSON.stringify(usuario))
                this.router.navigate(['/products'])

            }, err =>{ 
              console.log(err) 
              this.form.setErrors({
                invalidLogin: true
            });
            })
          }else{
            
            this.auth.login2(this.form.value)
            .subscribe( usuario =>{
                localStorage.setItem('token', JSON.stringify(usuario))
                this.router.navigate(['admin/products'])
            }, err =>{ 
              console.log(err) 
              this.form.setErrors({
                invalidLogin: true
            });
            })
          }  

     
      }else{
            this.form.setErrors({
              invalidLogin: true
            });
      }


    




 }

}
