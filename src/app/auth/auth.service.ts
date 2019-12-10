import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn$ = new BehaviorSubject<boolean>(false);

    get isLoggedIn(): boolean {
        return this.loggedIn$.getValue();
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.loggedIn$.asObservable();
    }

    login() {
        this.loggedIn$.next(true);
    }

    logout() {
        this.loggedIn$.next(false);
    }
}
