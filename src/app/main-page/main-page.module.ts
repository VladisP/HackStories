import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPageComponent} from './main-page.component';
import {HeaderModule} from '../header/header.module';
import {StoryListModule} from '../story-list/story-list.module';

@NgModule({
    declarations: [MainPageComponent],
    exports: [MainPageComponent],
    imports: [CommonModule, HeaderModule, StoryListModule],
})
export class MainPageModule {}
