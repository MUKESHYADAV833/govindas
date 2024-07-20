import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPosComponent } from './menu-pos.component';

describe('MenuPosComponent', () => {
  let component: MenuPosComponent;
  let fixture: ComponentFixture<MenuPosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPosComponent]
    });
    fixture = TestBed.createComponent(MenuPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
