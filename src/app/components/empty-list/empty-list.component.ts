import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.css']
})
export class EmptyListComponent implements OnInit {

  @Input() msg:string;

  constructor() { }

  ngOnInit() {
  }

}
