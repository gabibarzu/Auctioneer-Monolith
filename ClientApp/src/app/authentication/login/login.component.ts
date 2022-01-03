import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '..';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.isLoading = true;
      const model: Login = {
        username: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };
      this.service.login(model).subscribe(
        (result: any) => {
          this.resetForm();
        },
        (response) => {
          this.notification.create('error', 'Error', response.error.message);
          this.resetForm();
        }
      );
    }
  }

  private resetForm() {
    this.isLoading = false;
    this.loginForm.reset();
  }
}
