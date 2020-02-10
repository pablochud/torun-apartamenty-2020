import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {ServerUrlsService} from '../server-urls.service';
import {ReservationData} from './models/ReservationData';
import {AdditionalData} from './models/additional-data';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private httpClient: HttpClient) {
  }

  getReservations(month: string, year: number): Observable<ReservationData[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    const params = new HttpParams().append('month', month).append('year', String(year));
    return this.httpClient.get<ReservationData[]>(ServerUrlsService.getReservationsUrl(), {headers, params});
  }

  editAdditionalData(additionalData: AdditionalData): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.post(ServerUrlsService.editAdditionalDataUrl(), additionalData, {headers});
  }
}
