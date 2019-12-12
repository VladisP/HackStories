import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
    imports: [CommonModule, MatIconModule, MatToolbarModule, RouterModule.forChild([])],
})
export class ToolbarModule {}
