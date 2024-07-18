import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coupons, Menu } from 'src/models/Types';
import { MenuService } from '../services/menu.service';
import { CouponsService } from '../services/coupons.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy {
  couponsArray: Coupons[] = [];

  selectedItem: Coupons | null = null;
  private subscriptions: Subscription[] = [];
  modalOpen: boolean = false;

  constructor(
    private couponService: CouponsService
  ) { }


  ngOnInit(): void {
    this.subscriptions.push(
      this.couponService.items$.subscribe(items => this.couponsArray = items)
    );
    // Initial load of items
    this.couponsArray = this.couponService.getItems();
  }




  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  openModal(item?: Coupons) {
    this.modalOpen = true;
    this.selectedItem = item || null;
  }

  closeModal() {
    this.selectedItem = null;
    this.modalOpen = false;
  }

  deleteItem(item: Coupons) {
    this.couponService.deleteItemById(item.coupon_id);
  }
}
