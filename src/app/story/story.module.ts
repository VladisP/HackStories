import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryComponent} from './story.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [StoryComponent],
    exports: [StoryComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([]),
    ],
})
export class StoryModule {}
