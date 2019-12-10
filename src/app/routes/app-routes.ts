import {Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {HnUserComponent} from '../hn-user/hn-user.component';
import {ProfileComponent} from '../profile/profile.component';
import {AuthGuard} from '../auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'stories/:type',
        component: MainPageComponent,
    },
    {
        path: 'user/:id',
        component: HnUserComponent,
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    {
        path: '',
        redirectTo: '/stories/topstories',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
