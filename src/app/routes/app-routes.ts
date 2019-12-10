import {Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {MainPageComponent} from '../main-page/main-page.component';

export const appRoutes: Routes = [
    {
        path: 'stories/:type',
        component: MainPageComponent,
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
    //TODO: add hn-user component with param
];
