import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    var tokenExist = this.authService.isLoggedIn();
    if (tokenExist) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userDetails', response.user.username);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = [
              { severity: 'error', summary: 'Error', detail: response.message },
            ];
          }
        },
        error: (error: any) => {
          console.error('An error occurred:', error);
          this.errorMessage = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'An error occurred. Please try again later.',
            },
          ];
        },
      });
  }
  isFieldInvalid(field: string): any {
    const formControl = this.loginForm.get(field);
    return (
      formControl &&
      formControl.invalid &&
      (formControl.dirty || formControl.touched)
    );
  }

  onFieldBlur(field: string): void {
    const formControl = this.loginForm.get(field);
    if (formControl) {
      formControl.markAsTouched();
    }
  }
}