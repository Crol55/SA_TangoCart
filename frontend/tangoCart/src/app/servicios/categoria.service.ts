import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private api = 'http://35.192.90.40:3000/api'
  //private api = 'http://localhost:3000/api'

  constructor(public http: HttpClient) {}

  categorias? : Categoria[];

   getCategories(): Observable<Categoria[]>{
      const path = `${this.api}/category`;
      return  this.http.get<Categoria[]>(path)
   }



}
