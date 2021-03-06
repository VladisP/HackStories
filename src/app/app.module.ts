import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {faVk} from '@fortawesome/free-brands-svg-icons/faVk';
import {MainPageModule} from './main-page/main-page.module';
import {HnUserModule} from './hn-user/hn-user.module';
import {NotFoundModule} from './not-found/not-found.module';
import {ToolbarModule} from './toolbar/toolbar.module';
import {ProfileModule} from './profile/profile.module';
import {LoginModule} from './login/login.module';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes/app-routes';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeRu, 'ru');

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
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faVk);
    }
}
