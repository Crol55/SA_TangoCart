import { Producto } from "./products";
import { User } from "./user";

export interface Subasta {
    _id: string;
    propietario: User;
    usuarios: User;
    products: Producto;
    estado: string;
    oferta: string;
    fecha_final: string;
    createdAt?: string;
    __v: number;
}