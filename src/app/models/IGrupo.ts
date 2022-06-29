import { IProducto } from './IProducto';

export interface IGrupo{
    id:string;
    nombre:string;
    orden:number;
    productos:IProducto[];
}