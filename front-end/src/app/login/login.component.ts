import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import LoginCredentials from '../types/LoginCredentials';
import { LocalStorageService } from '../local-storage.service';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private myService: MyServiceService,
    private sharedService: SharedService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  public loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  login(event: Event) {
    event.preventDefault();
    const loginCredentials: LoginCredentials = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    if (
      loginCredentials.email.trim() === '' ||
      loginCredentials.password.trim() === ''
    ) {
      alert('Please Fill All Data.');
      return;
    }

    this.myService.login(loginCredentials).subscribe(
      (res) => {
        if (res.status != 201) {
          alert('Please Check Email and Password!');
        } else {
          this.localStorage.setItem('userId', res.body);
          this.sharedService.setUserId(res.body);
          this.router.navigate(['/auth/myaccount']);
        }
      },
      (error) => {
        if (error === 400) {
          alert('Please Enter valid data');
        } else {
          console.log(error);
        }
      }
    );
  }
}
