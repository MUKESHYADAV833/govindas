import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuCreationComponent } from './menu-creation/menu-creation.component';
import { AuthGuard } from './shared/auth.guard';
import { CouponsComponent } from './coupons/coupons.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu', component: MenuCreationComponent,canActivate:[AuthGuard] },
  { path: 'coupons', component: CouponsComponent,canActivate:[AuthGuard] },

  // Wildcard routes
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
