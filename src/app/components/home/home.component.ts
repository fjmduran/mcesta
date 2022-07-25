import { AuthService } from './../../services/auth.service';
import { IUser } from 'src/app/models/IUser';
import { IProducto } from './../../models/IProducto';
import { SelectProductsListComponent } from './../select-products-list/select-products-list.component';
import { IGrupo } from './../../models/IGrupo';
import { ICesta } from './../../models/ICesta';
import { ApiService } from './../../services/api.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscriptions: Subscription[]=[];
  private grupos:IGrupo[]=[];
  private productos:IProducto[]=[];
  public pendientes:IProducto[];
  public prodChecked:IProducto[]=[];
  private idCesta:string;
  public msgEmpty:string='La cesta está vacía';
  public user$:Observable<IUser>; 
  private cesta$:Observable<ICesta>;
  private $grupos:Subscription;
  
  constructor(private auth:AuthService, private api:ApiService, public dialog: MatDialog, private router: Router,private ngZone: NgZone) { }

  ngOnInit() {   
    this.auth.afsAuth.onAuthStateChanged((user) => {
      if (!user) {
        this.ngZone.run(() => {
          this.router.navigateByUrl("/login");
        });
        return;
      } else {
        this.user$ = this.auth.user$;
      }
    });
    
  }

  public loadCesta():Observable<ICesta>{
    
    const localBasket:ICesta = this.auth.getLocalBasket();

    if(!this.auth.user && localBasket){
      this.grupos=localBasket.grupos;
      if(!this.pendientes){
        this.toOrderProducts();
      }      
      return of(localBasket);
    }
    
    if(!this.auth.user.cesta){
      //no hay cesta predeterminada, abro la pantalla de listado de cestas
      this.router.navigate(['/cestas']);
    }else{      
      if (this.cesta$) return this.cesta$;
      this.idCesta=this.auth.user.cesta.id;     
      this.cesta$=this.api.GetCesta(this.auth.user.cesta.id);

      this.$grupos=this.api.GetGruposCesta(this.idCesta).subscribe(data=>{
        this.grupos=data;
        this.toOrderProducts();
      });
      this.subscriptions.push(this.$grupos);
      return this.cesta$;
    }
  }

  private toOrderProducts(){
    this.grupos=this.grupos.sort((a,b)=>{
      return a.orden - b.orden;
    });
    this.productos=[];
    this.pendientes=[];
    for(let g of this.grupos){        
      if(g.productos!=null){
        let prod:IProducto[]=g.productos;
        let pend:IProducto[]=g.productos;

        //Filtro los productos que no están pendientes para el FAB
        prod=prod.filter(p=>{
          p.idGrupo=g.id; //añado a cada producto su idgrupo            
          return p.pendiente==false;
        });    
        this.productos=this.productos.concat(prod);
        
        //Filtro los productos pendientes          
        pend=pend.filter(p=>{                     
          return p.pendiente==true;
        });            
        this.pendientes=this.pendientes.concat(pend);       
      }
    };
  }

  public CheckProduct(producto:IProducto):void{
    producto.check=!producto.check;
    if(producto.check){
      this.prodChecked.push(producto);
    }else{
      this.prodChecked.splice(this.prodChecked.indexOf(producto),1);
    }
  }

  public addProduct():void{    
    const dialogRef = this.dialog.open(SelectProductsListComponent, {
      width: '90%',
      maxWidth: '400px',
      data: { productos: this.productos }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=null && result!=""){
        let p:IProducto[]=result;
        this.api.SaveProductS(p,this.grupos,this.idCesta);
      }
      ;
    })
  }

  public cleanCesta():void{
    
    this.prodChecked.forEach(prod=>{
      prod.check=false;
      prod.pendiente=false;
      return;
    });

    this.api.SaveProductS(this.prodChecked, this.grupos, this.idCesta);
    this.prodChecked=[];
  }

  public Tacha(producto:IProducto):any{
    let styles = {
      'text-decoration': producto.check ? 'line-through' : 'none',
    };    
    return styles;
  }

  public ColorChange(producto:IProducto):any{
    let styles = {
      'background-color': producto.check ? 'orange' : 'green',      
    };
    return styles;
  }

  ngOnDestroy(){
    this.auth.setLocalBasket(this.grupos);
    for(let s of this.subscriptions){
      s.unsubscribe();
    }
  }
}
