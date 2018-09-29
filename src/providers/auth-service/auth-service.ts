import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENPOINT_USER_LOGIN, API_ENPOINT_USER_REGISTER, API_ENPOINT_GET_EVENTS_FROM_USER } from '../../shared/app.settings';

@Injectable()
export class AuthServiceProvider {
  public token: string;
  public myLat: number = 0;
  public myLng: number = 0;
  public maxDistanceKM: number = 70;

  constructor(public http: HttpClient) {
  }

  public login(credentials): any {
    return new Promise((resolve, reject) => {
      this.http.post(API_ENPOINT_USER_LOGIN, credentials).subscribe(token => {
        resolve(token);
      }, err => {
        reject(err);
      });
    })
  }

  public createAccount(newUser) {
    return new Promise((resolve, reject) => {
      this.http.post(API_ENPOINT_USER_REGISTER, newUser).subscribe(() => {
        resolve();
      }, err => {
        reject(err);
      })
    })
  }

  public getEventFronUser(idUser) {
    return new Promise((resolve, reject) => {
      this.http.get(API_ENPOINT_GET_EVENTS_FROM_USER + idUser).subscribe(events => {
        resolve(events);
      }, err => {
        reject(err);
      })
    })
  }

}
