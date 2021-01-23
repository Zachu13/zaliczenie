import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { LoginPayload, RegisterPayload } from '../auth.model';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  signupMode: boolean = false;
  authForm: FormGroup;
  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
  invalidEmailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  formTypeChange(): void {
    this.signupMode = !this.signupMode;
    this.createForm();
  }
  createForm(): void {
    if (this.signupMode) {
      this.authForm = this.fb.group({
        email: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.invalidEmailPattern),
          ],
        ],
        firstName: ['', [Validators.required, Validators.maxLength(25)]],
        indexNumber: ['', [Validators.required, Validators.maxLength(25)]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.passwordPattern),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.passwordPattern),
          ],
        ],
      });
    } else {
      this.authForm = this.fb.group({
        email: [
          '',
          [
            Validators.email,
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(this.invalidEmailPattern),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
          ],
        ],
      });
    }
  }

  onSubmit(): void {
    // Sign in
    if (!this.signupMode) {
      const loginPayload: LoginPayload = new LoginPayload(
        this.authForm.get('email').value,
        this.authForm.get('password').value
      );

      this.authService.loginUser(loginPayload).subscribe(
        (response) => {
          console.log(response), this.router.navigateByUrl('/courses');
        },
        (error) => {
          this.alertService.errorAlert('An error occured', error.error.message);
        }
      );
    } else {
      // Sign up mode
      const registerPayload: RegisterPayload = new RegisterPayload(
        this.authForm.get('email').value,
        this.authForm.get('firstName').value,
        this.authForm.get('indexNumber').value,
        this.authForm.get('password').value,
        this.authForm.get('confirmPassword').value
      );

      this.authService.registerUser(registerPayload).subscribe(
        (response) => console.log(response),
        (error) => {
          console.log(error),
            this.alertService.errorAlert(
              'An error occured',
              error.error.message
            );
        }
      );
    }
  }
}
