import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {StoryListModule} from './story-list/story-list.module';
import {HnUserModule} from './hn-user/hn-user.module';
import {RouterModule} from '@angular/router';
import {NotFoundModule} from './not-found/not-found.module';
import {ToolbarModule} from './toolbar/toolbar.module';
import {appRoutes} from './routes/app-routes';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        ToolbarModule,
        StoryListModule,
        HnUserModule,
        NotFoundModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
