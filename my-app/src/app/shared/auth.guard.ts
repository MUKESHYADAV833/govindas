// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { User } from 'src/models/User';
import { CryptoManager } from '../services/crypto-manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  curUser: User = {
    location: '',
    phone: 0,
    restaurantName: '',
    uid: '',
    username: ''
  };
  constructor(private router: Router, private storage: StorageService, private crypto: CryptoManager) {
    this.storage.curData$.subscribe(data => {
      this.curUser = data;
    })

  }

  canActivate(): boolean {
    const authData = localStorage.getItem('auth');
    if (authData) {
      // Optionally, add additional checks on authData
      let res: any = JSON.parse(this.crypto.decrypt(this.storage.getItem('credentials'), environment.salt_auth));
      this.curUser = {
        location: res.location,
        phone: res.phone,
        restaurantName: res.restaurantName,
        uid: res.uid,
        username: res.username
      };

      this.storage.updateUser(this.curUser)
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}