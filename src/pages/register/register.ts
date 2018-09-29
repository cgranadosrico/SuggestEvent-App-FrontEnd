import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

function passwordMatcher(c: AbstractControl) {
  console.log(c.get('password').value === c.get('repeatPasswd').value ? { 'noMatch': false } : { 'noMatch': true });
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public formRegister: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController, private toastCtrl: ToastController) {
    this.buildForm();
  }

  private buildForm(): void {
    this.formRegister = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9_-]{3,16}$/)]],
      email: ["", [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/)]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\ ]{3,20}$/)]],
      passwordGroup: this.fb.group({
        password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,10}/)]],
        repeatPasswd: ["", Validators.required]
      }, { validator: passwordMatcher })
      ,
    })
  }

  public register(formRegister: FormGroup): void {
    const newUser = {
      username: formRegister.value.username,
      email: formRegister.value.email,
      name: formRegister.value.name,
      password: formRegister.value.passwordGroup.password
    }
    this.authService.createAccount(newUser).then(() => {
      this.presentToast();
    }).catch(err => {
      console.log(err);
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public eventModal: any;
  public goLogin() {
    let eventModal = this.modalCtrl.create(LoginPage);
    eventModal.onDidDismiss(() => {
      this.navCtrl.pop();
    });
    eventModal.present();
  }

  closeLogin() {
    this.eventModal.dismiss();
  }

  closeRegister() {
    this.navCtrl.pop();
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

}
