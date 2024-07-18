import { Injectable } from '@angular/core';
import { CryptoManager } from './crypto-manager.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private curUser = new BehaviorSubject<any>(null);
  curData$ = this.curUser.asObservable();


  constructor(private crypto: CryptoManager) { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, this.crypto.encrypt(JSON.stringify(value), environment.salt_storage));
  }

  getItem(key: string): any {

    return JSON.parse(this.crypto.decrypt(localStorage.getItem(key)!, environment.salt_storage));
  }


  updateUser(data: any) {
    this.curUser.next(data);
  }

}
