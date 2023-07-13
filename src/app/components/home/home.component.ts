import { AuthService } from "./../../services/auth.service";
import { IUser } from "src/app/models/IUser";
import { IProducto } from "./../../models/IProducto";
import { SelectProductsListComponent } from "./../select-products-list/select-products-list.component";
import { IGrupo } from "./../../models/IGrupo";
import { ICesta } from "./../../models/ICesta";
import { ApiService } from "./../../services/api.service";
import { Component, HostListener, NgZone, OnInit, inject } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  private grupos: IGrupo[] = [];
  private productos: IProducto[] = [];
  public pendientes: IProducto[];
  public prodChecked: IProducto[] = [];
  private idCesta: string;
  public msgEmpty: string = "La cesta está vacía";
  public user$: Observable<IUser>;
  private cesta$: Observable<ICesta>;
  private $grupos: Subscription;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private _snackBar: MatSnackBar
  ) {}

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

  public loadCesta(): Observable<ICesta> {
    if (!this.auth.user) return;
    if (!this.auth.user.cesta) {
      //no hay cesta predeterminada, abro la pantalla de listado de cestas
      this.router.navigate(["/cestas"]);
    } else {
      if (this.cesta$) return this.cesta$;
      this.idCesta = this.auth.user.cesta.id;
      this.cesta$ = this.api.GetCesta(this.auth.user.cesta.id);

      this.$grupos = this.api.GetGruposCesta(this.idCesta).subscribe((data) => {
        this.grupos = data;
        this.toOrderProducts();
      });
      this.subscriptions.push(this.$grupos);
      return this.cesta$;
    }
  }

  private toOrderProducts() {
    this.grupos = this.grupos.sort((a, b) => {
      return a.orden - b.orden;
    });
    this.productos = [];
    this.pendientes = [];
    for (let g of this.grupos) {
      if (g.productos != null) {
        let prod: IProducto[] = g.productos;
        let pend: IProducto[] = g.productos;

        //Filtro los productos que no están pendientes para el FAB
        prod = prod.filter((p) => {
          p.idGrupo = g.id; //añado a cada producto su idgrupo
          return p.pendiente == false;
        });
        this.productos = this.productos.concat(prod);

        //Filtro los productos pendientes
        pend = pend.filter((p) => {
          return p.pendiente == true;
        });
        this.pendientes = this.pendientes.concat(pend);
      }
    }
  }

  public CheckProduct(producto: IProducto): void {
    producto.check = !producto.check;
    if (producto.check) {
      this.prodChecked.push(producto);
    } else {
      this.prodChecked.splice(this.prodChecked.indexOf(producto), 1);
    }
  }

  public addProduct(): void {
    const dialogRef = this.dialog.open(SelectProductsListComponent, {
      width: "90%",
      maxWidth: "400px",
      data: { productos: this.productos },
    });
    dialogRef.afterClosed().subscribe((result: IProducto[]) => {
      if (result) {
        const productsForBuy = result.filter((product) => product.pendiente);

        if (productsForBuy.length > 0) {
          let products = null;
          productsForBuy.forEach((prod) => {
            if (!products) {
              products = `✅ ${prod.nombre}`;
            } else {
              products = `${products}, ${prod.nombre}`;
            }
          });
          products = `${products} a la lista`;
          this._snackBar.open(products, "Cerrar", { duration: 5000 });
        }

        this.api.SaveProductS(productsForBuy, this.grupos, this.idCesta);
      }
    });
  }

  public cleanCesta(): void {
    this.prodChecked.forEach((prod) => {
      prod.check = false;
      prod.pendiente = false;
      return;
    });
    this.api.SaveProductS(this.prodChecked, this.grupos, this.idCesta);
    this.prodChecked = [];
  }

  public Tacha(producto: IProducto): any {
    let styles = {
      "text-decoration": producto.check ? "line-through" : "none",
    };
    return styles;
  }

  public ColorChange(producto: IProducto) {
    let styles = { "background-color": producto.check ? "orange" : "green" };
    if (!this.auth.user) {
      styles = {
        "background-color": "gray",
      };
    }
    return styles;
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    for (let s of this.subscriptions) {
      s.unsubscribe();
    }
  }
}
