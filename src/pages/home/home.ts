import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { EventListPage } from '../event-list/event-list';
import { CategoryServiceProvider } from '../../providers/category-service/category-service';
import { UserProfilePage } from '../user-profile/user-profile';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { EventPage } from '../event/event';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public categories: any;
  public lastCategory: any;
  public token: string;
  public infoUser: any;


  constructor(public navCtrl: NavController,
    public categoryService: CategoryServiceProvider, private nav: NavController,
    private authService: AuthServiceProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public eventService: EventServiceProvider, private geolocation: Geolocation) {

    this.getUserInfoFronToken()

    this.categoryService.getAll().then(_categories => {
      this.categories = _categories;
      if (_categories.length % 2 !== 0) {
        this.lastCategory = this.categories.pop();
      }
    }).catch(err => {
      console.log(err)
    });

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };


    let watch = this.geolocation.watchPosition(options);
    watch.subscribe((data) => {
      this.authService.myLat = data.coords.latitude;
      this.authService.myLng = data.coords.longitude;
    });


  };

  getUserInfoFronToken() {
    const base64Url = this.authService.token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    this.token = JSON.parse(window.atob(base64));
    this.infoUser = this.token['user'][0];
  }



  goToEvents(categoryId: number) {
    this.navCtrl.push(EventListPage, { categoryId });
  }

  getRandomEvent() {
    this.eventService.getRandomEvent().then(_event => {
      this.openEvent(_event[0]);
    }).catch(err => {
      console.log(err)
    });
  }

  public eventModal: any;
  public openEvent(event) {
    this.eventModal = this.modalCtrl.create(EventPage, { event });
    this.eventModal.onDidDismiss(data => {
      console.log(data);
    });
    this.eventModal.present();
  }

  closeEvent() {
    this.eventModal.dismiss();
  }

  goToProfile() {
    this.nav.setRoot(UserProfilePage);
  }

  goOut() {
    this.presentLoading();
    this.authService.token = "";
    this.nav.setRoot(LoginPage);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Deslogueando",
      duration: 100
    });
    loader.present();
  }



}

