import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryListComponent} from './story-list.component';
import {HttpClientModule} from '@angular/common/http';
import {StoryModule} from '../story/story.module';

@NgModule({
    declarations: [StoryListComponent],
    exports: [StoryListComponent],
    imports: [CommonModule, HttpClientModule, StoryModule],
})
export class StoryListModule {}
