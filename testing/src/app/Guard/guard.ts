import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(){
    if (this.auth.isLoggedIn()){
      return true;
    }else
        this.router.navigate(['/']);
        return false;
    }
    

}