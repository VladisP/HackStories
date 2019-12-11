import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [CommonModule, MatButtonModule],
})
export class ProfileModule {}
