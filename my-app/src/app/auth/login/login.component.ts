import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptoManager } from 'src/app/services/crypto-manager.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public data: any;

  constructor(private fb: FormBuilder, private crypto: CryptoManager, private storage:StorageService ) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|[0-9]{10}')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

    if (this.isLocalStorageAvailable()) {
      let res: any = this.storage.getItem('credentials');
      this.data = this.crypto.decrypt(res, environment.salt_auth);
      return this.data ? JSON.parse(this.data) : null;
    } else {
      return null;
    }

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.data.emailOrPhone == this.loginForm.value.emailOrPhone) {
        if (this.data.password == this.loginForm.value.password) {
          const loginData = this.loginForm.value;
          console.log('Login Data:', loginData);
          // Add logic to send data to the server here
        } else {
          alert("Please enter correct password")
        }
      } else {
        alert("Please enter correct email")
      }
    }
    else {
      console.log('Form is invalid');
    }
  }

  isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

}
