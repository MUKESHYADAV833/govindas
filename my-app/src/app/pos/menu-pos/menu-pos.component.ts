import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Menu } from 'src/models/Types';

@Component({
  selector: 'app-menu-pos',
  templateUrl: './menu-pos.component.html',
  styleUrls: ['./menu-pos.component.css']
})
export class MenuPosComponent implements OnInit {
  menuArray: Menu[] = [];
  category:any=[];
  type:any='Food'
  isActive = true;

  constructor(private menuService: MenuService) { }

  arr: any = [];
  ngOnInit(): void {
    this.menuArray = this.menuService.getItems()
    this.menuArray.forEach((item:any)=>{
      item.isActive = false,
      item.value =  1
    })
    this.selectCategory(this.type);
    for (let i = 0; i < 200; i++) {
      this.arr.push("we")

    }
  }

  //map menu 
  //add functionality

  selectCategory(type: any) {
    // this.category=[]
    if (type == 'Food') {
      this.type = type;
      this.isActive = true;
      this.category = this.menuArray.filter((t:any)=>t.category==type);
    } else if (type == 'Beverages') {
      this.type = type;
      this.isActive = false;
      this.category = this.menuArray.filter((t:any)=>t.category==type);
    }

  }

  addItem(item:any){
      if( item.value !=0 ){
        item.isActive = true;
      }
      console.log(item)
  }

  num_tem(item: any, type: any) {
    if (type == 'sub') {
      item.value = item.value != 0 ? item.value - 1 : 0;
      if (item.value == 0) {
        item.isActive = false;
      }
    } else {
      item.value = item.value != 0 ? item.value + 1 : 0;
    }
  }
}