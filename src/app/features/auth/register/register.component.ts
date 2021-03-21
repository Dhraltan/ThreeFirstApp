import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { CustomValidators } from '@app/core/helpers/custom-validators.helper';
import { URLS } from '@app/shared/enum';
import { RegisterPayload } from '@app/shared/interfaces';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: [null, [Validators.email, Validators.required]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidators.password,
          ],
        ],
        checkPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidators.password,
          ],
        ],
        firstName: [null, [Validators.required, CustomValidators.names]],
        lastName: [null, [Validators.required, CustomValidators.names]],
      },
      { validators: CustomValidators.passwordMatchValidator }
    );
  }

  submitForm(): void {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.valid) {
      this.authService.register(this.mapPayload()).subscribe(
        (res) => {
          this.notification.success(
            'Success',
            'Account was successfully created',
            { nzClass: 'success-notification' }
          );
        },
        (error) => {
          console.error(error);
          this.notification.error('Failed', error.message, {
            nzClass: 'error-notification',
          });
        },
        () => {
          this.router.navigate([URLS.LOGIN]);
        }
      );
    }
  }

  mapPayload(): RegisterPayload {
    const registerPayload = {
      lastName: this.registerForm.get('lastName').value,
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      password: this.registerForm.get('password').value,
    };
    return registerPayload;
  }

  redirectToLogin(): void {
    this.router.navigate([URLS.LOGIN]);
  }
}
