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

  /*private wishList_body = {
    "id_usuario": "", 
    "id_producto": ""
  }
  this.wishList_body.id_usuario = this.id_usuario; 
    this.wishList_body.id_producto = "615a7beaa1733e045cec3253";
    this.httpService.saveProductsToWishList( this.wishList_body ).subscribe( val => {
      window.alert(val);
    });*/
  

  constructor(public httpService: ListaDeseosService) { 

    let userInfo = this.getUserinfo();
    //console.log("que info traje", userInfo);
    this.id_usuario = userInfo['id'];
    //console.log("hora de la verdad", this.id_usuario);
  }
   
  ngOnInit(): void {

    this.getWishList();

    
  }

  getUserinfo(){
    let token = "" ; 
    token += localStorage.getItem('token');
    return JSON.parse(token)
    //console.log(val.info);
  }

  getWishList(){

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

  eliminar_de_wishlist(id_producto:string){
    //window.alert("si va a jalar chato"+id_producto);
    const http_body = {
      "id_usuario": this.id_usuario, 
      "id_producto": id_producto
    }
    this.httpService.removeProductFromWishList(http_body).subscribe( server_response => {
      //window.alert("Que respondio el server?"+ server_response);
      this.getWishList(); // para refrezcar
    });
  }

}
