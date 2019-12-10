import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {MatButtonModule} from '@angular/material/button';
import {StoryListModule} from '../story-list/story-list.module';

@NgModule({
    declarations: [MainPageComponent],
    exports: [MainPageComponent],
    imports: [CommonModule, MatButtonModule, StoryListModule],
})
export class MainPageModule {}
