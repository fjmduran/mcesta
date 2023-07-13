import { Component } from "@angular/core";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter, map } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "mcesta";

  constructor(private readonly swUpdate: SwUpdate) {
    this.swUpdate.versionUpdates.subscribe(data=>{
      console.log("swupdate",data);      
    });
  }
}
