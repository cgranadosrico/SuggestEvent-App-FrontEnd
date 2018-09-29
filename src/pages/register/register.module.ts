import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    HttpClientModule,
    IonicPageModule.forChild(RegisterPage),
  ],
  providers: [
    AuthServiceProvider,
    HttpClient
  ]
})
export class RegisterPageModule { }
