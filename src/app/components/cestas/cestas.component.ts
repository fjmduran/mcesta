import { ICesta } from "src/app/models/ICesta";
import { Observable, Subscription } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { IUser } from "./../../models/IUser";
import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CestaComponent } from "../cesta/cesta.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-cestas",
  templateUrl: "./cestas.component.html",
  styleUrls: ["./cestas.component.css"],
})
export class CestasComponent implements OnInit {
  public user$: Observable<IUser>;
  public msgEmpty: string = "No hay cestas";
  public codInv: string = "";

  private subs$: Subscription[] = [];
  private cesta$: Subscription;
  private cesta: ICesta;

  constructor(
    private auth: AuthService,
    private ngZone: NgZone,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.auth.afsAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user$ = this.auth.user$;
      } else {
        this.ngZone.run(() => {
          this.router.navigateByUrl("/auth");
        });
      }
    });
  }

  public openCesta(user:IUser, cesta: ICesta): void {
    const dialogRef = this.dialog.open(CestaComponent, {
      width: "90%",
      data: { cesta: cesta, user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == null || result == []) return;
      let cesta: ICesta = result;
      let nueva: boolean;
      if (cesta.id == null) nueva = true;
      cesta.id = this.api.SaveCesta(cesta);
      if (!user.cesta) user.cesta = cesta;
      if (nueva) {
        user.cestas.push(cesta);
      } else {
        if (user.cesta.id == cesta.id) user.cesta = cesta;
        user.cestas.forEach((c) => {
          if (cesta.id == c.id) {
            return (c = cesta);
          }
        });
      }
      this.auth.saveUser(user);
    });
  }

  public saveCod(user:IUser): void {
    this.cesta$ = this.api.GetCesta(this.codInv).subscribe((data) => {
      this.cesta = data;
      if (this.cesta != null) {
        user.cesta = this.cesta;
        user.cestas.push(this.cesta);
        this.auth.saveUser(user);
      } else {
        this.openSnackBar("El código de validación no es válido.");
      }
    });
    this.subs$.push(this.cesta$);
  }

  private openSnackBar(msg: string): void {
    this.snackBar.open(msg, "", {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    for (let s of this.subs$) {
      s.unsubscribe();
    }
  }
}
