import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerUrlsService} from '../server-urls.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient: HttpClient) { }

  getIdoSellList(): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<any>(ServerUrlsService.getIdoSellList(), { headers });
  }
}
