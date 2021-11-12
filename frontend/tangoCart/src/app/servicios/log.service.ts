import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {


  private api = "http://localhost:7000/esb_log_default"

  constructor(private http: HttpClient) { }

  postlog(data: any){
    const path = `${this.api}`;
    return  this.http.post(path,data)
  }



}
