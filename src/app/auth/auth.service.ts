import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, from} from 'rxjs';
import {IUser} from '../model/iuser';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _user$ = new BehaviorSubject<IUser | null>(null);

    redirectUrl: string | null = null;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.authState
            .pipe(
                map(fullUser => {
                    if (fullUser) {
                        return <IUser>{id: fullUser.uid, email: fullUser.email};
                    }

                    return null;
                }),
            )
            .subscribe(user => {
                this._user$.next(user);

                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = null;
                }
            });
    }

    get user$(): Observable<IUser | null> {
        return this._user$.asObservable();
    }

    get isLoggedIn$(): Observable<boolean> {
        return this._user$.asObservable().pipe(map(user => !!user));
    }

    login(email: string, password: string): Observable<firebase.auth.UserCredential> {
        return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }

    logout() {
        this.afAuth.auth.signOut();
        this.router.navigate(['login']);
    }
}
