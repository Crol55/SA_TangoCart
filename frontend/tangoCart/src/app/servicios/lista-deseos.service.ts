import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ListaDeseosService {

  // 'http://34.69.63.86:3000'
  private listaDeseos_API = 'http://35.192.90.40:5001';

  constructor(private http:HttpClient) { }

  saveProductsToWishList(body:any){
    const url = `${this.listaDeseos_API}/saveWishlist`;
    
    return this.http.post(url, body);
  }


  getProductsFromWishList(id_usuario:any){
    //window.alert("me estoy ejecutando?");
    const url = `${this.listaDeseos_API}/fetchwishlist`;
    let queryParams = new HttpParams().set("id_usuario", id_usuario);
    return this.http.get( url, { params: queryParams})
  }

  getTest(){
    const url = `${this.listaDeseos_API}/test`;
    let queryParams = new HttpParams().set("id_usuario", "61185295a79c651d40667682");
    return this.http.get(url, { headers: {}, params: queryParams})
    
  }

  removeProductFromWishList(http_body:any){
    const url = `${this.listaDeseos_API}/deleteWishlist`;
    return this.http.delete(url, { body: http_body});
  }
}
