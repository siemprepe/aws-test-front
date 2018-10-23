import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ValidateEmailDomain } from '../_helpers';
import { AlertService, UserService } from '../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    complete = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, ValidateEmailDomain]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(7)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register({userId: this.f.username.value,
                                  name: this.f.username.value,
                                  email: this.f.email.value,
                                  password: this.f.password.value})
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.loading = false;
                    this.complete = true;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.complete = false;
                });
    }
}
