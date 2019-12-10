import {Component} from '@angular/core';
import {
    FormGroup,
    FormControl,
    AbstractControl,
    FormGroupDirective,
    NgForm,
    Validators,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../auth/auth.service';

class LoginErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        const isSubmitted = form && form.submitted;

        return !!(control && control.invalid && (control.touched || isSubmitted));
    }
}

@Component({
    selector: 'tfs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    matcher = new LoginErrorStateMatcher();

    constructor(private authService: AuthService) {}

    get email(): AbstractControl {
        return <AbstractControl>this.form.get('email');
    }

    get password(): AbstractControl {
        return <AbstractControl>this.form.get('password');
    }

    onSignIn() {
        if (this.form.invalid) {
            return;
        }

        // tslint:disable-next-line: no-console
        this.authService.login();
    }

    onSignUp() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();

            return;
        }

        // tslint:disable-next-line: no-console
        console.log('sign up');
    }
}
