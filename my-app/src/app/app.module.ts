import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuCreationComponent } from './menu-creation/menu-creation.component';
import { ModalWindowComponent } from './menu-creation/modal.window/modal.window.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponsModalComponent } from './coupons/coupons-modal/coupons-modal.component';
import { PosComponent } from './pos/pos.component';
import { OrderListComponent } from './pos/order-list/order-list.component';
import { MenuPosComponent } from './pos/menu-pos/menu-pos.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    MenuCreationComponent,
    ModalWindowComponent,
    CouponsComponent,
    CouponsModalComponent,
    PosComponent,
    OrderListComponent,
    MenuPosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
