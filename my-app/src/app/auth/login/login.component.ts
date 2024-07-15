import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatamanagerService } from 'src/app/services/datamanger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public data: any;

  constructor(private fb: FormBuilder, private datmanager: DatamanagerService) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}|[0-9]{10}')]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  
    if (this.isLocalStorageAvailable()) {
      let res: any = localStorage.getItem('sign');
      console.log(res, 'res')
      this.data = this.datmanager.decrypt(res);
      console.log(this.data)
      return this.data ? JSON.parse(this.data) : null;
    } else {
      return null;
    }

  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.data.emailOrPhone == this.loginForm.value.emailOrPhone) {
        if(this.data.password == this.loginForm.value.password){
        const loginData = this.loginForm.value;
        console.log('Login Data:', loginData);
        // Add logic to send data to the server here
        }else{
          alert("Please enter correct password") 
        }
      }else{
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
