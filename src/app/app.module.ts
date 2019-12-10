import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageModule} from './main-page/main-page.module';
import {HnUserModule} from './hn-user/hn-user.module';
import {NotFoundModule} from './not-found/not-found.module';
import {ToolbarModule} from './toolbar/toolbar.module';
import {ProfileModule} from './profile/profile.module';
import {LoginModule} from './login/login.module';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes/app-routes';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MainPageModule,
        ToolbarModule,
        HnUserModule,
        NotFoundModule,
        ProfileModule,
        LoginModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
