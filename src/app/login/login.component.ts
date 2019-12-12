import {takeUntil} from 'rxjs/operators';
import {Component, OnDestroy} from '@angular/core';
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
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

class LoginErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(
        control: FormControl | null,
        form: FormGroupDirective | NgForm | null,
    ): boolean {
        const isSubmitted = form && form.submitted;

        return !!(control && control.invalid && (control.touched || isSubmitted));
    }
}

const USER_NOT_FOUND_ERROR = 'auth/user-not-found';
const WRONG_PASSWORD_ERROR = 'auth/wrong-password';
const EMAIL_IN_USE_ERROR = 'auth/email-already-in-use';
const INVALID_EMAIL_ERROR = 'auth/invalid-email';
const DEFAULT = 'DEFAULT';

const ERROR_MESSAGE: {[key: string]: string} = {
    [DEFAULT]: 'Неизвестная ошибка. Попробуйте позже',
    [USER_NOT_FOUND_ERROR]: 'Пользователя с такими данными не существует',
    [WRONG_PASSWORD_ERROR]: 'Введён неверный пароль',
    [EMAIL_IN_USE_ERROR]: 'Аккаунт с данным адресом почты уже зарегистрирован',
    [INVALID_EMAIL_ERROR]: 'Некорректный адрес электронной почты',
};

@Component({
    selector: 'tfs-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
    form: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    errorMessage: string | null = null;
    isLoading = false;
    matcher = new LoginErrorStateMatcher();

    private authCallbacks = {
        next: () => {
            this.isLoading = false;
            this.form.reset();
            this.router.navigate(['profile']);
        },
        error: (error: any) => {
            const code = error && error.code;

            this.isLoading = false;
            this.errorMessage = ERROR_MESSAGE[code] || ERROR_MESSAGE.DEFAULT;
        },
    };

    private destroy$ = new Subject();

    constructor(private authService: AuthService, private router: Router) {}

    ngOnDestroy() {
        this.destroy$.next();
    }

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

        this.isLoading = true;
        this.errorMessage = null;

        const {email, password} = this.form.value;

        this.authService
            .signIn$(email, password)
            .pipe(takeUntil(this.destroy$))
            .subscribe(this.authCallbacks);
    }

    onSignUp() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();

            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const {email, password} = this.form.value;

        this.authService
            .signUp$(email, password)
            .pipe(takeUntil(this.destroy$))
            .subscribe(this.authCallbacks);
    }
}
