import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Apartment} from './models/apartment';
import {Notification} from './models/notification';
import {ServerUrlsService} from '../server-urls.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {

  constructor(
    private httpClient: HttpClient) { }

  getApartments(): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<any>(ServerUrlsService.getApartmentsUrl(), { headers });
  }

  deleteApartment(id: number): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.delete(ServerUrlsService.deleteApartmentUrl(id), { headers });
  }

  editApartment(apartment: Apartment, id: number): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(ServerUrlsService.editApartmentUrl(id), apartment, { headers });
  }

  createApartment(newApartment: Apartment) {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(ServerUrlsService.createApartmentUrl(), newApartment, { headers });
  }

  getNotification(id: number): Observable<Notification[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get<Notification[]>(ServerUrlsService.getNotificationUrl(id), {headers});
  }

}
