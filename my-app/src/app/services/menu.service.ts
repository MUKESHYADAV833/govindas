import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from 'src/models/Types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private itemsSubject = new BehaviorSubject<Menu[]>([]);
  items$ = this.itemsSubject.asObservable();

  private items: Menu[] = [];

  constructor(private storage: StorageService) {
   
  }

  getItems(): Menu[] {
    if (localStorage.getItem('menu')) {
      this.items = JSON.parse(this.storage.getItem('menu'));
    }
    return this.items;
  }

  getItemById(id: string): Menu | undefined {
    return this.items.find(item => item.menu_id === id);
  }

  createItem(item: Menu) {
    this.items.push(item);
    this.storageMethod()
    this.itemsSubject.next(this.items);
  }

  updateItem(updatedItem: Menu) {
    const index = this.items.findIndex(item => item.menu_id === updatedItem.menu_id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.storageMethod();
      this.itemsSubject.next(this.items);
    }
  }


  deleteItemById(id: string) {
    const index = this.items.findIndex(item => item.menu_id === id);
    if (index !== -1) {
      this.items.splice(index, 1); // Remove the item from the array
      this.storageMethod(); // Update localStorage
      this.itemsSubject.next(this.items); // Emit updated items to subscribers
    }
  }

  
  private storageMethod() {
    this.storage.setItem('menu', JSON.stringify(this.items));
  }
}
