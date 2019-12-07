import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryListComponent} from './story-list.component';
import {HttpClientModule} from '@angular/common/http';
import {StoryModule} from '../story/story.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
    declarations: [StoryListComponent],
    exports: [StoryListComponent],
    imports: [CommonModule, HttpClientModule, StoryModule, InfiniteScrollModule],
})
export class StoryListModule {}
