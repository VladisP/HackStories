import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {MatButtonModule} from '@angular/material/button';
import {AngularFireDatabaseModule} from '@angular/fire/database';

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [CommonModule, MatButtonModule, AngularFireDatabaseModule],
})
export class ProfileModule {}
