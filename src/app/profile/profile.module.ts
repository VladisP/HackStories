import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {StoryListModule} from '../story-list/story-list.module';

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [CommonModule, MatButtonModule, AngularFireDatabaseModule, StoryListModule],
})
export class ProfileModule {}
