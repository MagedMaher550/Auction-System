import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import AddUser from '../types/addUser';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { SharedService } from '../shared-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private myService: MyServiceService,
    private sharedService: SharedService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  isTermsChecked: boolean = false;

  public registerForm = new FormGroup({
    fullname: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    termsCheckbox: new FormControl<boolean>(false, [Validators.required]),
  });

  register(event: Event) {
    event.preventDefault();
    const user: AddUser = {
      fullname: this.registerForm.value.fullname || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
    };

    if (
      user.fullname.trim() === '' ||
      user.email.trim() === '' ||
      user.password.trim() === ''
    ) {
      alert('Please Fill All Data.');
      return;
    }

    if (this.registerForm.value.termsCheckbox) {
      this.myService.register(user).subscribe(
        (res) => {
          if (res.status === 201) {
            this.localStorage.setItem('userId', res.body);
            this.sharedService.setUserId(res.body);
            this.router.navigate(['/auth/myaccount']);
            this.registerForm.reset();
          } else {
            alert('Please try again');
          }
        },
        (error) => {
          if (error === 400) {
            alert('This Email is already used!');
          }
        }
      );
    } else {
      alert('Please Accept Terms and Policy');
    }
  }
}
