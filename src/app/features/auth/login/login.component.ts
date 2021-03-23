import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { AccountService } from '@app/core/services/account.service';
import { URLS } from '@app/shared/enum';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue()).subscribe(
        (res) => {
          this.accountService.setUser(res);
          this.router.navigate([URLS.HOMEPAGE]);
        },
        (error) => {
          console.error(error);
          this.accountService.setUser(null);
          this.notification.error('Failed', error.message, {
            nzClass: 'error-notification',
          });
        }
      );
    }
  }

  redirectToRegister(): void {
    this.router.navigate([URLS.REGISTER]);
  }
}
