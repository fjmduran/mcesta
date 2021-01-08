import { IUser } from './../../models/IUser';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  public userOK: boolean = false;
  public fjmardu:boolean = false;
  public cestaOK:boolean=false;
  public user:IUser;

  constructor(private auth:AuthService) {
  }

  ngDoCheck() {
    this.user = this.auth.getCurrentUser();
    if (this.user==null) {
      this.userOK = false;      
    }else{
      this.userOK = true;
      if(this.user.cesta!=null) this.cestaOK=true; else this.cestaOK=false;
      if((this.user.email)==="fjmartinezduran@gmail.com") this.fjmardu=true; else this.fjmardu=false;
    }    
  }

}
