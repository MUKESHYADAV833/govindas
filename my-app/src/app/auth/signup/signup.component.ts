import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoManager } from 'src/app/services/crypto-manager.service';
import { StorageService } from 'src/app/services/storage.service';
import { UuidGenService } from 'src/app/services/uuid-gen.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private crypto: CryptoManager, private storage: StorageService, private route: Router,private uuidGenerator: UuidGenService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      restaurantName: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|[0-9]{10}')]],
      uid:['']
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Encrypt the form data and store it in local storage
      this.signupForm.value.uid = this.uuidGenerator.create();
      const signupData = this.crypto.encrypt(JSON.stringify(this.signupForm.value), environment.salt_auth);
      this.storage.setItem('credentials', signupData);

      this.route.navigate(['login']);
      this.signupForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

}
