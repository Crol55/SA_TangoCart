export interface Producto {
    _id: string;
    user: string;
    nombre: string;
    precio: number;
    descripcion: string;
    categoria: string;
    stock: number;
    foto: string;
    createdAt?: string;
  
  }