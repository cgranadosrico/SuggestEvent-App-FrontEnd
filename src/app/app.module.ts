import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPageModule } from '../pages/about/about.module';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfilePageModule } from '../pages/user-profile/user-profile.module';
import { EventPageModule } from '../pages/event/event.module';
import { EventListPageModule } from '../pages/event-list/event-list.module';
import { EventServiceProvider } from '../providers/event-service/event-service';
import { CategoryServiceProvider } from '../providers/category-service/category-service';
import { Geolocation } from '@ionic-native/geolocation'
import { TokenInterceptor } from '../shared/auth/interceptor';
import { FCM } from '@ionic-native/fcm'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    AboutPageModule,
    LoginPageModule,
    RegisterPageModule,
    UserProfilePageModule,
    EventPageModule,
    HttpClientModule,
    EventListPageModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar, FCM,
    SplashScreen,
    HttpClient,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventServiceProvider,
    CategoryServiceProvider,
    Geolocation,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },

  ]
})
export class AppModule { }
