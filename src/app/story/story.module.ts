import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoryComponent} from './story.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ShareModule} from '@ngx-share/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [StoryComponent],
    exports: [StoryComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        ShareModule,
        FontAwesomeModule,
        MatIconModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([]),
    ],
})
export class StoryModule {}
