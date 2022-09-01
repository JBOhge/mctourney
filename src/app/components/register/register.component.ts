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
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      [confirmPassword('password', 'passwordConfirm')]
    );
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('register');
    }
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
