import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subasta } from '../models/subasta';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {
  private api = 'http://34.69.63.86:4080'
  //private api = 'http://localhost:4080'
    
  constructor(public http: HttpClient) {}

  getSubastas(): Observable<Subasta[]>{
    return this.http.get<Subasta[]>(`${this.api}/auctions`);
  }

  getSubasta(id:any){
    let params = new HttpParams().set("_id", id); 
    return this.http.get<Subasta[]>(`${this.api}/auction`,{params:params});
  }

  postSubasta(objeto:any){
    return this.http.post<Subasta[]>(`${this.api}/auction`, objeto);
  }

  putSubasta(objeto:any){
    return this.http.put<Subasta[]>(`${this.api}/auction`,objeto);
  }

}
