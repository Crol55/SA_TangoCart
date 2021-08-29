import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categories';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private api = 'http://34.69.63.86:3000/api'

  constructor(public http: HttpClient) {}

  categorias? : Categoria[];

   getCategories(): Observable<Categoria[]>{
      const path = `${this.api}/category`;
      return  this.http.get<Categoria[]>(path)
   }



}
