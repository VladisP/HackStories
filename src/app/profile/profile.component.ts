import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {IUser} from '../model/iuser';
import {ProfileHttpService} from './services/profile-http.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'tfs-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    user: IUser | null = null;

    constructor(
        private profileService: ProfileHttpService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.authService.user$.pipe(take(1)).subscribe(user => this.setUser(<IUser>user));
    }

    private setUser(user: IUser) {
        this.profileService.getUserData$(user.id).subscribe(() => (this.user = user));
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
