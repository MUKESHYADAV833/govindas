import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DatamanagerService {
  private key: string = 'ab123dfsgtxv';  // Replace with your own key

  constructor() { }
  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  decrypt(encryptedData: string,): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
