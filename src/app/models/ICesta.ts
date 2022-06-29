import { IGrupo } from './IGrupo';

export interface ICesta{
    id:string
    nombre:string;
    propietario:string;
    usuarios:string[];
    grupos:IGrupo[];
}