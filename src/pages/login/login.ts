import { Component } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ModalController, NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController, private toastCtrl: ToastController) {
    this.buildForm();
  }

  private buildForm(): void {
    this.formLogin = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  public mrTest: any;
  public login(formLogin: FormGroup): void {
    this.authService.login(formLogin.value).then(jwt => {
      this.authService.token = jwt.token;
      this.goToHome()
    }).catch(err => {
      this.incorrectCredentials();
    });
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  incorrectCredentials() {
    let toast = this.toastCtrl.create({
      message: `Las credenciales no son válidas. Pruebe a intentarlo de nuevo`,
      duration: 2500,
      position: 'middle'
    });
    toast.present();
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);
  }

}
