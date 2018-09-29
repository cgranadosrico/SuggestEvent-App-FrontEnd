import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import moment from 'moment';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import leaflet from 'leaflet';


@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  public event: any;
  public distance: number;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(private navParams: NavParams, private navCtrl: NavController, private toastCtrl: ToastController,
    private alertCtrl: AlertController, private eventService: EventServiceProvider) {
    this.event = this.navParams.get('event');
    this.distance = this.event.distance.toFixed(2);

    this.checkDates(this.event);
  }

  private checkDates(event) {
    const eventDateStart = moment(event.date_star).format('YYYY-MM-DD, H:mm:ss');
    const now = moment().format('YYYY-MM-DD, H:mm:ss');
    const nowMoment = moment(now);

    nowMoment.diff(eventDateStart, 'days') == 0 ? this.itsHappeningAlert() : null;
    nowMoment.diff(eventDateStart, 'days') > 1 ? this.alreadyHappenedAlert() : null;
  }

  private alreadyHappenedAlert() {
    this.alertCtrl.create({
      title: 'Evento pasado!',
      subTitle: `<br>Este evento <strong>ya fue celebrado</strong>.<br> Aun así, es posible suscribirse para recibir noticias
      <br><br>
      <strong>Te mantendremos informado!!</strong>`,
      buttons: ['Okey!']
    }).present();
  }

  private itsHappeningAlert() {
    this.alertCtrl.create({
      title: 'No te lo pierdas!',
      subTitle: `<br>Este evento <strong>se esta celebrando!</strong><br> Ve lo mas rápido posible y no te pierdas nada.
      <br><br>
      <strong>Corre y disfruta!!</strong>`,
      buttons: ['Voy!']
    }).present();
  }

  public signUpForTheEvent() {
    this.eventService.assignEventToUser(this.event.id_event).then(this.showToast.bind(this));
  }

  showToast(value) {
    this.toastCtrl.create({
      message: value.message,
      duration: 3000,
      position: 'top'
    }).present();
  }

  public closeEvent() {
    this.navCtrl.pop();
  }

  ionViewDidEnter() {
    this.loadmap();
  }

  private loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 17,
      minZoom: 7
    }).addTo(this.map);

    this.map.setView(new leaflet.LatLng(this.event.latitude, this.event.longitude), 14);

    const markerGroup = leaflet.featureGroup();
    const marker: any = leaflet.marker([this.event.latitude, this.event.longitude]).on('click', () => {
    })
    markerGroup.addLayer(marker);
    this.map.addLayer(markerGroup);
  }
}
