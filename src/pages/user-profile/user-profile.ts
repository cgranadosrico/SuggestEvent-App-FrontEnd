import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  public eventModal: any;
  public token: string;
  public infoUser: any;
  public events: any;


  constructor(public modalCtrl: ModalController, public navCtrl: NavController,
    public navParams: NavParams, private authService: AuthServiceProvider,
    public alertCtrl: AlertController) {
    this.getUserInfoFronToken();
    this.getEventFromTheUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }


  public openEvent(event) {
    this.eventModal = this.modalCtrl.create(EventPage, { event });
    this.eventModal.onDidDismiss(data => {
      console.log(data);
    });
    this.eventModal.present();
  }

  getUserInfoFronToken() {
    const base64Url = this.authService.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    this.token = JSON.parse(window.atob(base64));
    this.infoUser = this.token['user'][0];
  }

  getEventFromTheUser() {
    this.authService.getEventFronUser(this.infoUser.id).then(_events => {
      this.events = _events;
    }).catch(err => {
      console.log(err)
    });
  }

  closeEvent() {
    this.eventModal.dismiss();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Filtro',
      message: "Distancia máxima a la que buscar un evento",
      inputs: [
        {
          name: 'Distancia maxima en km',
          placeholder: 'Cuantos km?'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.authService.maxDistanceKM = data['Distancia maxima en km'];
          }
        }
      ]
    });
    prompt.present();
  }


  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goOut() {
    this.authService.token = "";
    this.navCtrl.setRoot(LoginPage);
  }

}
