import { Injectable, NgZone } from "@angular/core";
import { IUser } from "../models/IUser";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private userFirebase: firebase.User;
  public user$: Observable<IUser>;
  public user: IUser;
  private userSubscription: Subscription;

  constructor(
    public afsAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.afsAuth.onAuthStateChanged((user) => {
      this.userFirebase=user;
      if (!this.userFirebase) {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/auth');
        });
        return;
      }else{
        this.checkUser();
      }
    });
  }

  logInEmail(email: string, password: string): Observable<IUser[]> {
    return this.afs
      .collection<IUser>("usuarios", (ref) => {
        let query: firebase.firestore.Query = ref;
        query = query.where("email", "==", email);
        query = query.where("pwd", "==", password);
        return query;
      })
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((action) => {
            const data = action.payload.doc.data() as IUser;
            return data;
          });
        })
      );
  }

  loginFirebaseEmail(email: string, pwd: string): Promise<firebase.auth.UserCredential> {
    return this.afsAuth.signInWithEmailAndPassword(email, pwd);
  }

  loginGoogle(): Promise<firebase.auth.UserCredential> {
    return this.afsAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  private checkUser(): void {
    if (this.userFirebase) {
      this.user$ = this.getUserById(this.userFirebase.email);
      this.userSubscription = this.user$.subscribe((data) => {
        this.user = data;
        console.log('Usuario OK');
      });
    } else {
      if (this.userSubscription) {
        this.user$ = null;
        this.userSubscription.unsubscribe();
        this.userSubscription = null;
      }
    }
  }

  public getUserById(id: string): Observable<IUser> {
    return this.afs
      .doc<IUser>('/usuarios/' + id)
      .snapshotChanges()
      .pipe(
        map((action) => {
          if (action.payload.exists == false) {
            return null;
          } else {
            const data = action.payload.data() as IUser;
            return data;
          }
        })
      );
  }

  public saveUser(user: IUser): void {
    if (!user.id) {
      //usuario nuevo
      this.afs.collection("/usuarios").doc(user.email).set(user);
      console.log("Usuario añadido");
    } else {
      this.afs.doc("/usuarios/" + user.id).update(user);
    }
  }

  siginFirebaseEmail(email: string, pwd: string): Promise<firebase.auth.UserCredential> {
    return this.afsAuth.createUserWithEmailAndPassword(email, pwd);
  }

  public logOut(): Promise<void> {
    this.user=null;
    this.userSubscription.unsubscribe();
    return this.afsAuth.signOut();
  }
}
