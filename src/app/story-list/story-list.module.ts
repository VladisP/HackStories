import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryListComponent} from './story-list.component';
import {HttpClientModule} from '@angular/common/http';
import {StoryModule} from '../story/story.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [StoryListComponent],
    exports: [StoryListComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        StoryModule,
        InfiniteScrollModule,
        MatProgressSpinnerModule,
    ],
})
export class StoryListModule {}
