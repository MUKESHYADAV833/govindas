import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/models/Types';
import { MenuService } from '../services/menu.service';



@Component({
  selector: 'app-menu-creation',
  templateUrl: './menu-creation.component.html',
  styleUrls: ['./menu-creation.component.css']
})
export class MenuCreationComponent implements OnInit, OnDestroy {


  menuArray: Menu[] = [];

  selectedItem: Menu | null = null;
  private subscriptions: Subscription[] = [];
  modalOpen: boolean = false;

  constructor(
    private menuService: MenuService,
  ) { }


  ngOnInit(): void {
    this.subscriptions.push(
      this.menuService.items$.subscribe(items => this.menuArray = items)
    );
    // Initial load of items
    this.menuArray = this.menuService.getItems();
  }




  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  openModal(item?: Menu) {
    this.modalOpen = true;
    this.selectedItem = item || null;
  }

  closeModal() {
    this.selectedItem = null;
    this.modalOpen = false;
  }

  deleteItem(item: Menu) {
    this.menuService.deleteItemById(item.menu_id);
  }
}
