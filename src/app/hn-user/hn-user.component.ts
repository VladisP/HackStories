import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {HnUserHttpService} from './services/hn-user-http.service';
import {IHnUser} from '../model/ihn-user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'tfs-hn-user',
    templateUrl: './hn-user.component.html',
    styleUrls: ['./hn-user.component.css'],
})
export class HnUserComponent implements OnInit {
    user: IHnUser | null = null;

    constructor(
        private userHttp: HnUserHttpService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {
        this.route.paramMap.pipe(map(paramMap => paramMap.get('id'))).subscribe(id => {
            this.getUser(<string>id);
        });
    }

    private getUser(id: string) {
        this.userHttp.getUser$(id).subscribe(user => {
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
