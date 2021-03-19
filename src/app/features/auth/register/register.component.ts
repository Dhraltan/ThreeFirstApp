import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/api';
import { URLS } from '@app/shared/enum';
import { RegisterPayload } from '@app/shared/interfaces';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    if (this.registerForm.valid) {
      this.authService.register(this.mapPayload()).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.router.navigate([URLS.LOGIN]);
        }
      );
    }
  }

  mapPayload(): RegisterPayload{
    const registerPayload ={
      lastName: this.registerForm.get("lastName").value,
      email: this.registerForm.get("email").value,
      firstName: this.registerForm.get("firstName").value,
      password: this.registerForm.get("password").value
    }
    return registerPayload
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.registerForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  redirectToLogin(): void {
    this.router.navigate([URLS.LOGIN]);
  }
}
