import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Register } from '../shared/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.registerForm.invalid) {
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }
    } else {
      this.isLoading = true;
      const model: Register = {
        username: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      this.service.register(model).subscribe(
        (result) => {
          this.notification.create('success', 'Success', 'User was added!');
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
    this.registerForm.reset();
  }
}
