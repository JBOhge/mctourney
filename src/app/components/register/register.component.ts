import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  get password() {
    return this.registerForm.get('password');
  }
  get playername() {
    return this.registerForm.get('playername');
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        playername: new FormControl('', [
          Validators.required,
          isValidPlayername(),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      [confirmPassword('password', 'passwordConfirm')]
    );
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService
        .signup(
          this.registerForm.value.email,
          this.registerForm.value.playername,
          this.registerForm.value.password,
          this.registerForm.value.passwordConfirm
        )
        .subscribe();
    }
  }

  isPasswordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('passwordConfirm')?.touched
    );
  }
}

//password confirm form validator
function confirmPassword(source: string, target: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const sourceCtrl = control.get(source);
    const targetCtrl = control.get(target);
    return sourceCtrl && targetCtrl && sourceCtrl.value == targetCtrl.value
      ? null
      : { mismatch: true };
  };
}

function isValidPlayername(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.getRawValue().match(/^[a-zA-Z0-9_]{3,16}$/)
      ? null
      : { invalidPlayername: true };
  };
}
