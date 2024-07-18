import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoManager } from 'src/app/services/crypto-manager.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public curUser: User = {
    phone: 0,
    location: '',
    restaurantName: '',
    username: '',
    uid: ''
  };

  constructor(private fb: FormBuilder, private crypto: CryptoManager, private storage: StorageService, private route: Router) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|[0-9]{10}')]],
      password: ['', Validators.required]
    });
  }

  private subscriptions: Subscription[] = [];
  ngOnInit() {

    // if (this.isLocalStorageAvailable()) {
    //   let res: any = JSON.parse(this.crypto.decrypt(this.storage.getItem('credentials'), environment.salt_auth));
    //   this.curUser = {
    //     location: res.location,
    //     phone: res.phone,
    //     restaurantName: res.restaurantName,
    //     uid: res.uid,
    //     username: res.username
    //   };
    // }


  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let res: any;
      if (this.isLocalStorageAvailable()) {
        res = JSON.parse(this.crypto.decrypt(this.storage.getItem('credentials'), environment.salt_auth));
      }
      if (res.phone == this.loginForm.value.phone && res.password == this.loginForm.value.password) {
        this.storage.updateUser(this.curUser)
        this.storage.setItem('auth', this.crypto.encrypt(JSON.stringify(this.loginForm.value), environment.salt_auth));

        this.route.navigate(['/menu']);
      } else {
        alert("Please enter correct Phone no/password")
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
