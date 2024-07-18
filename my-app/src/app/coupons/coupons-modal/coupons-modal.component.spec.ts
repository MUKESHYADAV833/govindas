import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsModalComponent } from './coupons-modal.component';

describe('CouponsModalComponent', () => {
  let component: CouponsModalComponent;
  let fixture: ComponentFixture<CouponsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponsModalComponent]
    });
    fixture = TestBed.createComponent(CouponsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
