import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { IUser } from "src/app/models/IUser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";

@Component({
  selector: "profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  public ProfileForm: FormGroup;
  public user$: Observable<IUser>;
  private userLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.ProfileForm = new FormGroup({
      id: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  public loadUser(user: IUser): boolean {
    if (this.userLoaded) return true;
    console.log(user);
    this.ProfileForm.setValue({
      id: user.id,
      email: user.email,
    });
    this.userLoaded = true;
    return this.userLoaded;
  }

  public saveUser(user: IUser): void {
    user = this.ProfileForm.value;
    this.authService.saveUser(user);
    this.openSnackBar("Usuario guardado");
  }

  public getError(controlName: string): string {
    let error = "";
    const control = this.ProfileForm.get(controlName);
    if (control == null) return;
    if (control.touched && control.errors != null) {
      switch (controlName) {
        case "email":
          error = "Introduce un email válido";
          break;
      }
    }
    return error;
  }

  async cierraSesion(): Promise<void> {
    await this.authService.logOut();
    this.router.navigate(["/login"]);
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 5000,
    });
  }
}
