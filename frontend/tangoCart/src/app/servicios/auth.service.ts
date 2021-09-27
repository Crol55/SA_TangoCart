import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://34.69.63.86:4000'
  private api2 = 'http://34.69.63.86:4001'

  //private api = 'http://localhost:4000'
  //private api2 = 'http://localhost:4001'

  constructor(public http: HttpClient, public router: Router ){ }
  

  login(credencials: any) {
      const path = `${this.api}/login`;
      return this.http.post(path,credencials)
  }

  login2(credencials: any) {
    const path = `${this.api2}/login`;
    return this.http.post(path,credencials)
 }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('NoItems');
    localStorage.removeItem('IdCart');
    this.router.navigate(['/login']);
  }

  postUsuario(usuario: any){
    const path = `${this.api}/signup`;
    return this.http.post(path,usuario)
  }

  postUsuario2(usuario: any){
    const path = `${this.api}/signup`;
    return this.http.post(path,usuario)
  }

  sendNotifyCliente(notificacion: any){
    const path = `${this.api}/notify`;
    return this.http.post(path,notificacion)
  }

  sendNotifyProveedor(notificacion: any){
    const path = `${this.api2}/notify`;
    return this.http.post(path,notificacion)
  }


  isLoggedIn() {
    let token = localStorage.getItem('token')
    if(!token) return false;
    return true;
  }
  
  get currentUser() {
    let token = localStorage.getItem('token')
    if(!token) return null;
    return  JSON.parse(token).info
  }

 
  
}
