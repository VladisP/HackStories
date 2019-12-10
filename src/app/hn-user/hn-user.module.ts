import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HnUserComponent} from './hn-user.component';
import {HttpClientModule} from '@angular/common/http';
import {StoryListModule} from '../story-list/story-list.module';

@NgModule({
    declarations: [HnUserComponent],
    exports: [HnUserComponent],
    imports: [CommonModule, HttpClientModule, StoryListModule],
})
export class HnUserModule {}
