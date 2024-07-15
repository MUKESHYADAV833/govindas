import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoManager {

  constructor() { }
  encrypt(data: any,key:string): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  decrypt(encryptedData: string,key:string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
