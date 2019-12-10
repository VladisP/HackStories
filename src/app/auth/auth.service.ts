import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn$ = new BehaviorSubject<boolean>(false);

    redirectUrl: string | null = null;

    constructor(private router: Router) {}

    get isLoggedIn(): boolean {
        return this.loggedIn$.getValue();
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    login() {
        this.loggedIn$.next(true);

        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = null;
        }
    }

    logout() {
        this.loggedIn$.next(false);
    }
}
