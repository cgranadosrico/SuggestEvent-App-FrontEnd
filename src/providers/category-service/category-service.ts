import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENPOINT_CATEGORY } from '../../shared/app.settings';

@Injectable()
export class CategoryServiceProvider {

  constructor(public http: HttpClient) {
  }

  public getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(API_ENPOINT_CATEGORY).subscribe(category => {
        resolve(category);
      }, err => {
        reject(err);
      })
    })
  }

}
