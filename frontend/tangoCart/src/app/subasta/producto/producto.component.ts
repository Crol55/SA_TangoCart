import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subasta } from 'src/app/models/subasta';
import { AuthService } from 'src/app/servicios/auth.service';
import { OrderService } from 'src/app/servicios/order.service';
import { SubastaService } from 'src/app/servicios/subasta.service';

@Component({
  selector: 'subasta-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  private _id?: string | null;
  public categoria?: string | null;
  tiempoRestante: any;
  ofertaP: any;
  estado: boolean = false;
  finalizarCompra: boolean = false;
  form = new FormGroup({
    oferta: new FormControl('')
  })

  name = new FormControl('', []);
  
  public subasta : Subasta = {
    _id: "",
    propietario: {},
    usuarios: {},
    products: {
      _id: "",
      user: "",
      nombre: "",
      precio: 0,
      descripcion: "",
      categorias: "",
      stock: 0,
      foto: "",
      createdAt: "",
    },
    estado: "",
    oferta: "",
    fecha_final: "",
    createdAt: "",
    __v: 0
  };

  constructor(public route: ActivatedRoute, public subastaService: SubastaService, public auth :AuthService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    route.queryParamMap.subscribe(params =>{
      this._id = params.get('_id');
    });
    this.subastaService.getSubasta(this._id).subscribe(res =>{
      this.subasta._id = res[0]._id;
      this.subasta.propietario = res[0].propietario;
      this.subasta.usuarios = res[0].usuarios;
      this.subasta.products = res[0].products;
      this.subasta.estado = res[0].estado;
      this.subasta.oferta = res[0].oferta;
      this.subasta.fecha_final = res[0].fecha_final;
      this.comprobarEstado(this.subasta.usuarios);
      this.calcular(this.subasta.fecha_final);      
    }); 
  }
  
  ngOnInit(): void {  
    //console.log(this.auth.currentUser[0]._id); 
  }

  calcular(fecha:any){
    let countdowndate = new Date(fecha).getTime();
    let x = setInterval(()=>{
      var now = new Date().getTime();
      var distance = countdowndate - now;
      var days = Math.floor(distance/(1000*60*60*24));
      var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
      var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
      var seconds = Math.floor((distance % (1000*60)) / 1000);
      if(days == 0 && hours > 0){
        this.tiempoRestante = `${hours} h : ${minutes} m : ${seconds} s `;
      }
      else if(hours == 0 && minutes > 0){
        this.tiempoRestante = `${minutes} m : ${seconds} s `;
      }
      else{
        this.tiempoRestante = `${seconds} s `;
      }
      
      if(distance < 0){
        clearInterval(x);
        this.tiempoRestante = "La subasta finalizó!";
        this.mensajeFinal(this.subasta.usuarios);
        this.estado = true;
        this.form.disable();
      }
    });
  }
  
  comprobarEstado(valor:any){
    if(valor._id == this.auth.currentUser[0]._id){
      this.ofertaP = 'Tienes la oferta principal!';
    }
    else{
      this.ofertaP = '';
    }
    //console.log(valor._id);
  }

  mensajeFinal(valor:any){
    if(valor._id == this.auth.currentUser[0]._id){
      this.ofertaP = 'Felicidades, el producto es tuyo!';
      this.finalizarCompra = true;
    }
  }

  comprobarValor(valor:any){
    return String(parseInt(valor) + 5);
  }

  devolverFecha(valor:any){
    return String(new Date(valor).toLocaleDateString() + " " + this.formatAMPM(new Date(valor)));
  }

  formatAMPM(date:Date) {
    var hours = date.getHours();
    var minutes:any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  ofertar(){
    //console.log("ofertar")
    //CONFIRMAR
    this.subastaService.getSubasta(this._id).subscribe(res =>{
      this.comprobarEstado(res[0].usuarios);
      this.subasta.oferta = res[0].oferta;
      //ACTUALIZAR DATOS
      if(this.form.value.oferta == ""){
        this._snackBar.open("Debe ingresar una oferta!", "Ok", {duration:2000});
      }
      else if(parseInt(this.form.value.oferta) >= parseInt(this.subasta.oferta)+5){
        
        const actualizar = {
          _id: this.subasta._id,
          propietario: this.subasta.propietario._id,
          usuarios: this.auth.currentUser[0]._id,
          products: this.subasta.products._id,
          estado: this.subasta.estado,
          oferta: this.form.value.oferta,
          fecha_final: this.subasta.fecha_final
        }
        
        this.subastaService.putSubasta(actualizar).subscribe(p => {
          //console.log(p);
          // OBTENER DATOS ACTUALIZADOS
          this.subastaService.getSubasta(this._id).subscribe(res =>{
            this.subasta._id = res[0]._id;
            this.subasta.propietario = res[0].propietario;
            this.subasta.usuarios = res[0].usuarios;
            this.subasta.products = res[0].products;
            this.subasta.estado = res[0].estado;
            this.subasta.oferta = res[0].oferta;
            this.subasta.fecha_final = res[0].fecha_final;
            this.comprobarEstado(this.subasta.usuarios);
          }); 
        });
      }
      else{
        this._snackBar.open("La oferta tiene que se mayor a $ " + (parseInt(this.subasta.oferta)+5), "Ok", {duration:2000});
      }    
      this.form.reset();
    });     
  }
  
  finalizar(){
    const dialogRef = this.dialog.open(DialogMessage, {
      data: {
        producto: this.subasta.products,
        precio: this.subasta.oferta,
        subasta: this.subasta
      }
    });
  }
}




@Component({
  selector: 'app-mensaje',
  templateUrl: 'dialog.html',
  styleUrls: ['./producto.component.css']
})
export class DialogMessage  implements OnInit {
  form = new FormGroup({
    ciudad: new FormControl('',Validators.required),
    direccion1: new FormControl('',Validators.required),
    direccion2: new FormControl('',Validators.required),
    opcion: new FormControl('',Validators.required)
  })

  constructor(public subastaService: SubastaService, public router: Router, public dialogRef: MatDialogRef<DialogMessage>, @Inject(MAT_DIALOG_DATA) public data:any, private snackBar: MatSnackBar, public auth :AuthService, public orderService: OrderService, public OrderService: OrderService) {
  }
  ngOnInit(): void {
    //this.data.producto.precio = this.data.precio;
    //console.log(this.data.producto.precio);
  }

  async finalizar(){
    console.log("Opcion: "+this.form.value.opcion);
    if (this.form.value.ciudad == "" || this.form.value.direccion1 == "" || this.form.value.direccion2 == "" || this.form.value.opcion == ""){
      this.snackBar.open("Debe completar el formulario!", "Ok", {duration:2000});
    }
    else{
      let shipping = {
        name: this.auth.currentUser[0].nombre + " " + this.auth.currentUser[0].apellido,
        city: this.form.value.ciudad,
        addressLine1 : this.form.value.direccion1,
        addressLine2 : this.form.value.direccion2
      }
      let order = {
        user: this.auth.currentUser[0]._id,
        shipping: shipping,
        items: this.data.producto,
        tipo: this.form.value.opcion,
        estado: (this.form.value.opcion == 'Envío') ? 'Pedido realizado' : 'En Tienda'
      }
      this.data.producto.precio = this.data.precio;
      
      const actualizar = {
        _id: this.data.subasta._id,
        propietario: this.data.subasta.propietario._id,
        usuarios: this.auth.currentUser[0]._id,
        products: this.data.subasta.products._id,
        estado: 'Inactiva',
        oferta: this.form.value.oferta,
        fecha_final: this.data.subasta.fecha_final
      }


      await this.subastaService.putSubasta(actualizar).toPromise();

      this.snackBar.open("Orden generada con éxito!", "Ok", {duration:2000});

      this.dialogRef.close();
      let order$ = await this.orderService.postOrder(order).toPromise();

      if(this.form.value.opcion == "En Tienda"){
        let orderBody = {
          name: this.auth.currentUser[0].nombre,
          lastName: this.auth.currentUser[0].apellido,
          address1: this.form.value.direccion1, 
          address2: this.form.value.direccion2, 
          orderID: order$._id, 
          total: this.data.precio, 
          items: [this.data.producto],
          correo: this.auth.currentUser[0].correo
        }  
        await this.OrderService.postEmail(orderBody).toPromise();
        this.snackBar.open(`Se ha enviado el correo con éxito!`, "Ok", {duration:3500});
      }

      this.router.navigate(['/order-success',order$._id])

    }
  }
}