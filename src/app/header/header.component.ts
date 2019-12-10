import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'tfs-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
    isLoggedIn = this.authService.isLoggedIn;

    private authSubscription = this.authService.isLoggedIn$.subscribe(
        newState => (this.isLoggedIn = newState),
    );

    constructor(private authService: AuthService) {}

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }
}
