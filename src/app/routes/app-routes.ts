import {Routes} from '@angular/router';
import {StoryListComponent} from '../story-list/story-list.component';
import {NotFoundComponent} from '../not-found/not-found.component';

export const appRoutes: Routes = [
    {
        path: 'stories/:type',
        component: StoryListComponent,
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
