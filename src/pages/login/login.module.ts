import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    AuthServiceProvider,
    HttpClient
  ]
})
export class LoginPageModule { }
