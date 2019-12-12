import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IUser} from '../model/iuser';
import {ProfileHttpService} from './services/profile-http.service';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
    selector: 'tfs-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
    user: IUser | null = null;

    private destroy$ = new Subject();

    constructor(
        private profileService: ProfileHttpService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.authService.user$
            .pipe(take(1), takeUntil(this.destroy$))
            .subscribe(user => this.setUser(<IUser>user));
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    private setUser(user: IUser) {
        this.profileService
            .getUserData$(user.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => (this.user = user));
    }

    get randomAvatar(): string {
        return `https://avatars.dicebear.com/v2/identicon/${(<IUser>this.user).id}.svg`;
    }

    get nickname(): string {
        return (<IUser>this.user).email;
    }

    onSignOut() {
        this.authService.signOut();
    }
}
