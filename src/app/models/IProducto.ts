export interface IProducto{
    id:number; //será la fecha en segundos, para identificar a los productos
    nombre:string;
    pendiente:boolean;
    idGrupo?:string;
    check?:boolean;
}