import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coupons, Menu } from 'src/models/Types';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  private itemsSubject = new BehaviorSubject<Coupons[]>([]);
  items$ = this.itemsSubject.asObservable();

  private items: Coupons[] = [];

  constructor(private storage: StorageService) {
   
  }

  getItems(): Coupons[] {
    if (localStorage.getItem('coupons')) {
      this.items = JSON.parse(this.storage.getItem('coupons'));
      console.log(this.items);
    }

    return this.items;
  }

  getItemById(id: string): Coupons | undefined {
    return this.items.find(item => item.coupon_id === id);
  }

  createItem(item: Coupons) {
    this.items.push(item);
    this.storageMethod()
    this.itemsSubject.next(this.items);
  }

  updateItem(updatedItem: Coupons) {
    const index = this.items.findIndex(item => item.coupon_id === updatedItem.coupon_id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.storageMethod();
      this.itemsSubject.next(this.items);
    }
  }


  deleteItemById(id: string) {
    const index = this.items.findIndex(item => item.coupon_id === id);
    if (index !== -1) {
      this.items.splice(index, 1); // Remove the item from the array
      this.storageMethod(); // Update localStorage
      this.itemsSubject.next(this.items); // Emit updated items to subscribers
    }
  }

  
  private storageMethod() {
    this.storage.setItem('coupons', JSON.stringify(this.items));
  }
}
