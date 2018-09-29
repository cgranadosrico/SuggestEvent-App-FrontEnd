import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENPOINT_EVENT, API_ENPOINT_ONE_EVENT, API_ENPOINT_EVENTS_FROM_CATEGORY, API_ENPOINT_ASSIGN_EVENT_TO_USER, API_ENPOINT_GET_RANDOM_EVENT } from '../../shared/app.settings';

@Injectable()
export class EventServiceProvider {

  constructor(public http: HttpClient) {
  };

  public getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(API_ENPOINT_EVENT).subscribe(event => {
        resolve(event);
      }, err => {
        reject(err);
      });
    });
  };

  public getEvent(id) {
    return new Promise((resolve, reject) => {
      this.http.get(API_ENPOINT_ONE_EVENT + id).subscribe(event => {
        resolve(event);
      }, err => {
        reject(err);
      });
    });
  };

  public getEventsFromCategory(categoryId, positions) {
    return new Promise((resolve, reject) => {
      this.http.post(API_ENPOINT_EVENTS_FROM_CATEGORY + categoryId, positions).subscribe(event => {
        resolve(event);
      }, err => {
        reject(err);
      });
    });
  };

  public assignEventToUser(eventId) {
    return new Promise((resolve, reject) => {
      this.http.post(API_ENPOINT_ASSIGN_EVENT_TO_USER + eventId, {}).subscribe((message) => {
        console.log(message);
        resolve(message);
      }, err => {
        reject(err);
      });
    });
  }

  public getRandomEvent() {
    return new Promise((resolve, reject) => {
      this.http.get(API_ENPOINT_GET_RANDOM_EVENT).subscribe(randomEvent => {
        resolve(randomEvent);
      }, err => {
        reject(err);
      });
    });
  }

}
