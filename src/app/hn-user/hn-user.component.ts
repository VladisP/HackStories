import {map, takeUntil} from 'rxjs/operators';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {HnUserHttpService} from './services/hn-user-http.service';
import {IHnUser} from '../model/ihn-user';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
    selector: 'tfs-hn-user',
    templateUrl: './hn-user.component.html',
    styleUrls: ['./hn-user.component.css'],
})
export class HnUserComponent implements OnInit, OnDestroy {
    user: IHnUser | null = null;

    private destroy$ = new Subject();

    constructor(
        private userHttp: HnUserHttpService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap
            .pipe(
                map(paramMap => paramMap.get('id')),
                takeUntil(this.destroy$),
            )
            .subscribe(id => {
                this.getUser(<string>id);
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }

    private getUser(id: string) {
        this.userHttp
            .getUser$(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                if (user) {
                    this.user = user;

                    return;
                }

                this.router.navigate(['not-found']);
            });
    }

    get randomAvatar(): string {
        return `https://avatars.dicebear.com/v2/identicon/${this.nickname}.svg`;
    }

    get nickname(): string {
        return (<IHnUser>this.user).id;
    }

    get karma(): number {
        return (<IHnUser>this.user).karma;
    }

    get createdDate(): number {
        return (<IHnUser>this.user).created * 1000;
    }
}
