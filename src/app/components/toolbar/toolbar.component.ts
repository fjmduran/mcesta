import { IUser } from './../../models/IUser';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

import packageJson from '../../../../package.json';

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

  public appVersion:string;

  constructor(public auth:AuthService) {
    this.appVersion=packageJson.version;
  }

}
