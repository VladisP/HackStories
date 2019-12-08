import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HnUserComponent} from './hn-user.component';

@NgModule({
    declarations: [HnUserComponent],
    exports: [HnUserComponent],
    imports: [CommonModule],
})
export class HnUserModule {}
