import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/models/User';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/models/Types';
import { StorageService } from 'src/app/services/storage.service';
import { UuidGenService } from 'src/app/services/uuid-gen.service';
import { MenuService } from 'src/app/services/menu.service';




@Component({
  selector: 'app-menu-modal',
  templateUrl: './modal.window.component.html',
  styleUrls: ['./modal.window.component.css']
})
export class ModalWindowComponent implements OnInit, OnChanges, OnDestroy {


  @Input() item: Menu | null = null;
  @Output() close = new EventEmitter<void>();

  private curUser: User = {
    username: '',
    phone: 0,
    location: '',
    uid: '',
    restaurantName: ''
  };

  menuForm: FormGroup;
  isEditMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private uuidGenerator: UuidGenService,
    private menuService: MenuService
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      qty: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.pattern('(https?://.*\\.(?:png|jpg))')]],
      restaurant_id: [''],
      menu_id: ['']
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.storage.curData$.subscribe(data => {
        this.curUser = data;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      if (this.item) {
        this.isEditMode = true;
        console.log(this.item);
        this.menuForm.patchValue(this.item);
      } else {
        this.isEditMode = false;
        this.menuForm.reset();
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {

    if (this.menuForm.valid) {
      if (this.isEditMode) {
        this.menuService.updateItem(this.menuForm.value);
      } else {
        this.menuForm.value.restaurant_id = this.curUser.uid;
        this.menuForm.value.menu_id = this.uuidGenerator.create();
        this.menuService.createItem(this.menuForm.value);

      }
      this.closeModal();
    }
  }

  get name() { return this.menuForm.get('name'); }
  get price() { return this.menuForm.get('price'); }
  get qty() { return this.menuForm.get('qty'); }
  get type() { return this.menuForm.get('type'); }
  get imageUrl() { return this.menuForm.get('imageUrl'); }

}
