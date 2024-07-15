import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatamanagerService } from 'src/app/services/datamanger.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private datamanager:DatamanagerService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      restaurantName: ['', Validators.required],
      location: ['', Validators.required],
      emailOrPhone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|[0-9]{10}')]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      const signupData = this.datamanager.encrypt(this.signupForm.value);

      localStorage.setItem('sign',signupData)
      console.log('Signup Data:', signupData);
      // Add logic to send data to the server here
      this.signupForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

}
