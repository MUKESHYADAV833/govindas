import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-pos',
  templateUrl: './menu-pos.component.html',
  styleUrls: ['./menu-pos.component.css']
})
export class MenuPosComponent implements OnInit {

  constructor() { }

  arr: any = [];
  ngOnInit(): void {
    for (let i = 0; i < 50; i++) {
      this.arr.push("we")

    }
  }

  //map menu 
  //add functionality

}