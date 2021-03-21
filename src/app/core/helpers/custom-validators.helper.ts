import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
  private static patterns = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
    names: /^(([A-Za-z\s]+[\-\']?)*)$/,
  };

  static password(control: AbstractControl) {
    const regex: RegExp = CustomValidators.patterns.password;
    const valid = regex.test(control.value);
    return valid ? null : { wrongPassword: true };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value;
    const checkPassword: string = control.get('checkPassword').value;
    if (password === checkPassword) {
      return null;
    } else
      return control.get('checkPassword').setErrors({ NoPassswordMatch: true });
  }

  public static names(control: FormControl) {
    const regex = CustomValidators.patterns.names;
    return regex.test(control.value) ? null : { validateName: true };
  }
}
