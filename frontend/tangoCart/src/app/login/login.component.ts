import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  form = new FormGroup({
    email:    new FormControl('',Validators.required), 
    password: new FormControl('',Validators.required),
  })
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

 get email(){
   return this.form.get("email")
 }

 get password(){
   return this.form.get('password')
 }

 login(){
     console.log(this.form.value)
     if(this.form.valid){
      this.router.navigate(['/'])
     }else{
      this.form.setErrors({
        invalidLogin: true
    });
     }
 }

}
