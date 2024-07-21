import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  constructor() { }

  arr: any = [];
  pop:boolean = false;
  ngOnInit(): void {
    for (let i = 0; i < 200; i++) {
      this.arr.push("we")

    }
  }

  handlePop(){
    this.pop =!this.pop;
  }

}
