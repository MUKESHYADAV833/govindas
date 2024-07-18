import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CouponsService } from 'src/app/services/coupons.service';
import { StorageService } from 'src/app/services/storage.service';
import { UuidGenService } from 'src/app/services/uuid-gen.service';
import { Coupons } from 'src/models/Types';
import { User } from 'src/models/User';

@Component({
  selector: 'app-coupons-modal',
  templateUrl: './coupons-modal.component.html',
  styleUrls: ['./coupons-modal.component.css']
})
export class CouponsModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: Coupons | null = null;
  @Output() close = new EventEmitter<void>();

  private curUser: User = {
    username: '',
    phone: 0,
    location: '',
    uid: '',
    restaurantName: ''
  };

  couponForm: FormGroup;
  isEditMode = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private uuidGenerator: UuidGenService,
    private couponService: CouponsService
  ) {
    this.couponForm = this.fb.group({
      coupon_code: ['', Validators.required],
      discount_percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      validity_type: ['', Validators.required],
      start_date: [''],
      end_date: [''],
      comment: [''],
      valid_days: this.fb.array([]),
      restaurant_id: [''],
      coupon_id: ['']
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.storage.curData$.subscribe(data => {
        this.curUser = data;
      })
    );

    this.couponForm.get('validity_type')?.valueChanges.subscribe(value => {
      this.onValidityTypeChange(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      if (this.item) {
        this.isEditMode = true;
        this.couponForm.patchValue(this.item);
        if (this.item.valid_days) {
          this.setValidDays(this.item.valid_days);
        }
      } else {
        this.isEditMode = false;
        this.couponForm.reset();
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
    if (this.couponForm.valid) {
      if (this.isEditMode) {
        this.couponService.updateItem(this.couponForm.value);
      } else {
        this.couponForm.value.restaurant_id = this.curUser.uid;
        this.couponForm.value.coupon_id = this.uuidGenerator.create();
        this.couponService.createItem(this.couponForm.value);
      }
      this.closeModal();
    }
  }

  onValidityTypeChange(value: string) {
    const validDaysControl = this.couponForm.get('valid_days') as FormArray;
    validDaysControl.clear();
    this.couponForm.get('start_date')?.setValidators([]);
    this.couponForm.get('end_date')?.setValidators([]);

    if (value === 'WEEKDAYS') {
      this.setValidDays([
        { day: 'MONDAY' }, { day: 'TUESDAY' }, { day: 'WEDNESDAY' }, { day: 'THURSDAY' }, { day: 'FRIDAY' }
      ]);
    } else if (value === 'WEEKENDS') {
      this.setValidDays([
        { day: 'SATURDAY' }, { day: 'SUNDAY' }
      ]);
    } else if (value === 'SPECIFIC_DATE') {
      this.couponForm.get('start_date')?.setValidators([Validators.required]);
      this.couponForm.get('end_date')?.setValidators([Validators.required]);
    } else if (value === 'SPECIFIC_DAYS') {
      this.addDay();
    }

    this.couponForm.get('start_date')?.updateValueAndValidity();
    this.couponForm.get('end_date')?.updateValueAndValidity();
  }

  setValidDays(days: { day: string }[]) {
    const validDaysControl = this.couponForm.get('valid_days') as FormArray;
    days.forEach(day => {
      validDaysControl.push(this.fb.group(day));
    });
  }

  addDay() {
    const validDaysControl = this.couponForm.get('valid_days') as FormArray;
    validDaysControl.push(this.fb.group({
      day: ['', Validators.required]
    }));
  }

  removeDay(index: number) {
    const validDaysControl = this.couponForm.get('valid_days') as FormArray;
    validDaysControl.removeAt(index);
  }

  get coupon_code() { return this.couponForm.get('coupon_code'); }
  get discount_percentage() { return this.couponForm.get('discount_percentage'); }
  get validity_type() { return this.couponForm.get('validity_type'); }
  get start_date() { return this.couponForm.get('start_date'); }
  get end_date() { return this.couponForm.get('end_date'); }
  get comment() { return this.couponForm.get('comment'); }
  get valid_days() { return this.couponForm.get('valid_days') as FormArray; }
}
