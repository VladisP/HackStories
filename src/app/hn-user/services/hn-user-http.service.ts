import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IHnUser} from '../../model/ihn-user';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HnUserHttpService {
    private _userStoriesIds: number[] = [];

    constructor(private http: HttpClient) {}

    getUser$(id: string): Observable<IHnUser> {
        return this.http
            .get<IHnUser>(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
            .pipe(
                tap(user => {
                    if (user && user.submitted) {
                        this._userStoriesIds = user.submitted;
                    }
                }),
            );
    }

    get userStoriesIds(): number[] {
        return this._userStoriesIds;
    }
}
