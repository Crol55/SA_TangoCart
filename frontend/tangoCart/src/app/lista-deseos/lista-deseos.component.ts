import { Component, OnInit } from '@angular/core';
import { ListaDeseosService } from '../servicios/lista-deseos.service';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})

export class ListaDeseosComponent implements OnInit {

  public array_lista_deseos:any = [];

  public id_usuario = "";

  constructor(public httpService: ListaDeseosService) { 

    let userInfo = this.getUserinfo();
    //console.log("que info traje", userInfo);
    this.id_usuario = userInfo[0]['_id'];
    //console.log("hora de la verdad", this.id_usuario);
  }
   
  ngOnInit(): void {

    this.httpService.getProductsFromWishList(this.id_usuario).subscribe( (data:any) =>{
      //window.alert(data);
      console.log(data);
      if (data['state'] == true){
        console.log("todo bien");
        console.log(data['mensaje']);
        
        this.array_lista_deseos = data['mensaje'];
        //console.log(this.array_lista_deseos[0]);
      }else {
        console.log("todo mal");
      }
      //this.array_lista_deseos = data;
      //console.log(this.array_lista_deseos['mensaje']);
    });

  }

  getUserinfo(){
    let token = "" ; 
    token += localStorage.getItem('token');
    return JSON.parse(token).info
    //console.log(val.info);
  }

}
