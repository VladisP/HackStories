import {Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {MainPageComponent} from '../main-page/main-page.component';
import {HnUserComponent} from '../hn-user/hn-user.component';

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
        path: '',
        redirectTo: '/stories/topstories',
        pathMatch: 'full',
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
