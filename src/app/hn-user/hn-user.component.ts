import {Component, OnInit, Input} from '@angular/core';
import {HnUserHttpService} from './services/hn-user-http.service';
import {IHnUser} from '../model/ihn-user';

@Component({
    selector: 'tfs-hn-user',
    templateUrl: './hn-user.component.html',
    styleUrls: ['./hn-user.component.css'],
})
export class HnUserComponent implements OnInit {
    @Input() userId: string | null = null;
    user: IHnUser | null = null;

    constructor(private userHttp: HnUserHttpService) {}

    ngOnInit() {
        this.userHttp.getUser$(<string>this.userId).subscribe(user => (this.user = user));
    }

    get randomAvatar(): string {
        return `https://avatars.dicebear.com/v2/identicon/${this.userId}.svg`;
    }

    get karma(): number {
        return (<IHnUser>this.user).karma;
    }

    get createdDate(): number {
        return (<IHnUser>this.user).created * 1000;
    }
}
