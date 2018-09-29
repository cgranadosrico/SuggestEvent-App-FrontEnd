import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { ModalController, NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  /* public events: Array<SocialEvent>; */
  public events: any;
  public categoryId: number;
  public eventModal: any;



  constructor(private eventService: EventServiceProvider, public modalCtrl: ModalController, public navCtrl: NavController,
    public viewCtrl: ViewController, private navParams: NavParams, private authService: AuthServiceProvider) {

    this.categoryId = this.navParams.get('categoryId');
    const positions = {
      maxDistanceKM: this.authService.maxDistanceKM,
      myLat: this.authService.myLat,
      myLng: this.authService.myLng
    }
    this.eventService.getEventsFromCategory(this.categoryId, positions).then(_events => {
      this.events = _events;
    }).catch(err => {
      console.log(err)
    });
  }

  public goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  public openEvent(event) {
    this.eventModal = this.modalCtrl.create(EventPage, { event });
    this.eventModal.onDidDismiss(data => {
      console.log(data);
    });
    this.eventModal.present();
  }

  public closeEvent() {
    this.eventModal.dismiss();
  }
}

