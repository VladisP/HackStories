import {Routes} from '@angular/router';
import {StoryListComponent} from '../story-list/story-list.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: StoryListComponent,
    },
    //TODO: add hn-user component with param
    //TODO: add page 404
];
