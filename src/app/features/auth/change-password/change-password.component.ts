import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { CustomValidators } from '@app/core/helpers/custom-validators.helper';
import { AccountService } from '@app/core/services/account.service';
import { URLS } from '@app/shared/enum';
import { ChangePasswordPayload } from '@app/shared/interfaces/Payload/ChangePasswordPayload';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.maxLength(100),
            Validators.minLength(4),
          ],
        ],
        oldPassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidators.password,
          ],
        ],
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
      },
      { validators: CustomValidators.passwordMatchValidator }
    );
  }

  submitForm(): void {
    for (const i in this.changePasswordForm.controls) {
      this.changePasswordForm.controls[i].markAsDirty();
      this.changePasswordForm.controls[i].updateValueAndValidity();
    }

    if (this.changePasswordForm.valid) {
      this.authService
        .changePassword(this.mapPayload())
        .subscribe(
          (res) => {
            this.router.navigate([URLS.HOMEPAGE]);
          },
          (error) => {
            console.error(error);
            this.notification.error('Failed', error.message, {
              nzClass: 'error-notification',
            });
          }
        );
    }
  }

  mapPayload(): ChangePasswordPayload{
    return {
      email: this.changePasswordForm.get('email').value,
      newPassword: this.changePasswordForm.get('password').value,
      oldPassword: this.changePasswordForm.get('oldPassword').value,
    }
  }
}
