import { Injectable } from '@angular/core';
import { CryptoManager } from './crypto-manager.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private crypto: CryptoManager) { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, this.crypto.encrypt(JSON.stringify(value), environment.salt_storage));
  }

  getItem(key: string): any {

    return JSON.parse(this.crypto.decrypt(localStorage.getItem(key)!, environment.salt_storage));
  }
}
