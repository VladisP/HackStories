import {IUser} from './../../model/iuser';
import {AuthService} from './../../auth/auth.service';
import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {take, switchMap, map} from 'rxjs/operators';
import {Observable, combineLatest} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfileHttpService {
    constructor(private authService: AuthService, private db: AngularFireDatabase) {}

    addToFavorites(id: number): Observable<any> {
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
}
