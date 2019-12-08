import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StoryListModule} from './story-list/story-list.module';
import {HnUserModule} from './hn-user/hn-user.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        StoryListModule,
        HnUserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
