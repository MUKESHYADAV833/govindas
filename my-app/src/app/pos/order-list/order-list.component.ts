import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  arr: any = [];
  constructor() { }
  ngOnInit(): void {
    for (let i = 0; i < 200; i++) {
      this.arr.push("we")

    }
  }
}
