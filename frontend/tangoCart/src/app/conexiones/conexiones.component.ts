import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ProductoService } from '../servicios/producto.service';

@Component({
  selector: 'app-conexiones',
  templateUrl: './conexiones.component.html',
  styleUrls: ['./conexiones.component.css']
})
export class ConexionesComponent implements OnInit {
  
  objetoActual : boolean = false
   
  Grupo1 = {
     mensaje: "Tienda 1 en linea",
     registro: "http://34.125.203.249/sa/user/add",
     login:  "http://34.125.203.249/sa/user/login" ,
     getProducts: "", 
  };

  Grupo2 = {
    mensaje:   "Tienda 2 en linea",
    registro:  "http://174.138.109.46/api/users/signup",
    login:     "http://174.138.109.46/api/users/signig",
    getProducts: "http://174.138.109.46/api/providers/allProducts",
    postProduct: "http://174.138.109.46/api/providers/newProduct"  
  }

  Grupo3 = {
    mensaje: "Tienda 3 en linea",
  };

  Grupo4 = {
    mensaje: "Tienda 4 en linea",
    registro: "http://35.192.90.40:4000/signup",
    login: "http://35.192.90.40:4000/login",
    getProducts: "http://35.192.90.40:3000/api/product",
    postProduct: "http://35.192.90.40:3000/api/product"
  }


  Grupo5 = {
    mensaje: "Tienda 5 en linea",
      registro: "http://34.125.95.83:4000/esb/api/users/signup",
      login: "http://34.125.95.83:4000/esb/api/users/signin",
      getProducts: "http://34.125.95.83:4000/esb/api/providers/products",
      postProduct: "http://34.125.95.83:4000/esb/api/providers/newProduct"
  };

  
  Grupo6 = {
    mensaje:  "Tienda 6 en linea",
    registro: "http://sa-g6.herokuapp.com/api/users/signup",
    login:    "http://sa-g6.herokuapp.com/api/users/signig", 
    getProducts: "http://sa-g6.herokuapp.com/api/providers/allProducts",
    postProduct: "http://sa-g6.herokuapp.com/api/providers/newProduct"
  }
  Grupo7 = {
    mensaje: "Tienda 7 en linea",
  }


  Grupo8 = {
    mensaje: "Tienda 8 en linea",
    registro: "http://3.12.103.111:4000/api/users/signup",
    login: "http://3.12.103.111:4000/api/users/signin",
    getProducts: "http://3.12.103.111:4000/api/providers/products",
    postProducts: "http://3.12.103.111:4000/api/providers/newProduct"
  };

  template = true;

  constructor(public auth: AuthService,
              public product: ProductoService) {
      
  }

  ngOnInit(): void {
  }

  getCheckboxesValue() {

    if(this.template){
      
      this.objetoActual = this.template
      let valores = JSON.parse(JSON.stringify(this.objetoActual));
      
      // login y registro
      this.auth.EndPoint.login= valores.login
      this.auth.EndPoint.registro= valores.registro
      this.auth.EndPoint.mensaje= valores.mensaje
      
      // Productos
      this.product.EndPoint.getAll = valores.getProducts

      console.log("Nueva Conexión", this.auth.EndPoint);

    }
  }

}
