import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
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
  })
  constructor(private router: Router,
              public auth: AuthService,
             ) { }

  ngOnInit(): void {
  
  }

 get correo(){
   return this.form.get("correo")
 }

 get password(){
   return this.form.get('password')
 }


 login(){
     if(this.form.valid){
            console.log(this.form.value)
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
            this.form.setErrors({
              invalidLogin: true
            });
      }
 }


 




}
