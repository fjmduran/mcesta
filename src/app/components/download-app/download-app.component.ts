import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.css']
})
export class DownloadAppComponent implements OnInit {

  public chrome: boolean = false;
  public safari: boolean = false;
  public opera:boolean=false;
  public explorer:boolean=false;
  public firefox:boolean=false;

  public openSamsung:boolean=false;
  public openChrome:boolean=false;

  constructor() { }

  ngOnInit() {
    this.chrome = navigator.userAgent.indexOf('Chrome') > -1;
    this.explorer = navigator.userAgent.indexOf('MSIE') > -1;
    this.firefox = navigator.userAgent.indexOf('Firefox') > -1;
    this.safari = navigator.userAgent.indexOf("Safari") > -1;
    this.opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
    if ((this.chrome) && (this.safari)) this.safari = false;
    if ((this.chrome) && (this.opera)) this.chrome = false;
  }

  public OpenSamsung():void{
    this.openSamsung=!this.openSamsung;
  }

  public OpenChrome():void{
    this.openChrome=!this.openChrome;
  }

}
