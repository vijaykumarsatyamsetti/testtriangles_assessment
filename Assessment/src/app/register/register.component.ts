import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService, UserService, AuthenticationService } from '@app/_services';

@Component({templateUrl: 'register.component.html', styles: ['.validation_error{ color:red }']})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    password_mismatch = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['',[ Validators.required, Validators.email ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), this.validateUserAlreadyExist('email')]],
            username: ['', [Validators.required, this.validateUserAlreadyExist('username')]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
            displayName: ['',[Validators.required]],
            firstName: ['',[]],
            lastName: ['',[]],
            nickname: ['',[]],
            website: ['',[]],
            bio: ['',[]],
            jabber: ['',[]],
            aol: ['',[]],
            yahoo: ['',[]]            
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    
    private validateUserAlreadyExist(input): ValidatorFn{
        return (control: AbstractControl): {[key: string]: any} => {
          let field = {};
          field[input] = control.value;
          return this.userService.checkUserAlreadyExists(field)
            .subscribe(
              (data) => {
                let res: User = data;
                if (res[input] === control.value) {
                  control.setErrors({ alreadyExist: true });
                  return {'alreadyExist': true};
                } else {
                  return null
                }
              },
              (error) => {
                console.log(error);
              }
            )
        }
    }
}
