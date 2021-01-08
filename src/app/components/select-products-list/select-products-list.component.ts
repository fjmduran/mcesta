import { IProducto } from 'src/app/models/IProducto';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-products-list',
  templateUrl: './select-products-list.component.html',
  styleUrls: ['./select-products-list.component.css']
})
export class SelectProductsListComponent implements OnInit {

  private productosBrutos:IProducto[]=[];
  public productos:IProducto[]=[];

  constructor(public dialogRef: MatDialogRef<SelectProductsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //productos
    if (this.data.productos==null) {
      console.error("No se han conseguido los productos");
    } else {
      this.productosBrutos=this.data.productos;
      this.productosBrutos=this.productosBrutos.sort((a, b) => (a.nombre > b.nombre ? 1 : -1)); 
      this.productos=this.productosBrutos;
    }
  }

  public Search(event:any):void{
    let txt:string=event.target.value;
    if(txt==""){
      this.productos=this.productosBrutos;
    }else{
      this.productos = this.productos.filter(p=>{
        return p.nombre.includes(event.target.value)===true;
      });
    }
  }

  public OnChange(event:any, p:IProducto):void{
    let checked:boolean=event.checked;
    let i:number = this.productosBrutos.indexOf(p);
    this.productosBrutos[i].pendiente=checked;
    i=this.productos.indexOf(p);
    this.productos[i].pendiente=checked;
  }

  public onSave():void{    
    this.dialogRef.close(this.productos);
  }

}
