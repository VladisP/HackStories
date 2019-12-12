import {IUser} from './../../model/iuser';
import {AuthService} from './../../auth/auth.service';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {take, switchMap, map, tap} from 'rxjs/operators';
import {Observable, combineLatest, of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileHttpService {
    private _favoriteStoriesIds: number[] = [];

    constructor(private authService: AuthService, private db: AngularFireDatabase) {}

    getUserData$(id: string): Observable<any> {
        return of(id).pipe(
            map(id => this.db.object(`users/${id}/favorites`)),
            switchMap(ref => ref.valueChanges().pipe(take(1))),
            tap(ids => {
                if (ids) {
                    this._favoriteStoriesIds = ids;
                }
            }),
        );
    }

    get favoriteStoriesIds(): number[] {
        return this._favoriteStoriesIds;
    }

    addToFavorite$(id: number): Observable<any> {
        return (<Observable<IUser>>this.authService.user$).pipe(
            take(1),
            map(({id}) => this.db.object(`users/${id}/favorites`)),
            switchMap(ref => {
                return combineLatest([ref], ref.valueChanges()).pipe(
                    take(1),
                    map(([ref, ids]) => {
                        if (!ids) {
                            ref.set([id]);

                            return;
                        }

                        if ((<number[]>ids).indexOf(id) !== -1) {
                            throw 'duplicate';
                        }

                        ref.set([id, ...(<number[]>ids)]);
                    }),
                );
            }),
        );
    }

    isFavorite$(id: number): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map(user => user && this.db.object(`users/${user.id}/favorites`)),
            switchMap(ref => (ref ? ref.valueChanges() : of(null))),
            map(ids => ids && (<number[]>ids).indexOf(id) !== -1),
        );
    }
}
