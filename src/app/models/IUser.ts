import { ICesta } from './ICesta';
export interface IUser{
    id:string;
    email:string;
    pwd?:string;
    cesta:ICesta;
    cestas:ICesta[];
}