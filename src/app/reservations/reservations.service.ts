import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {ServerUrlsService} from '../server-urls.service';
import {TruncatedReservation} from './models/TruncatedReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private httpClient: HttpClient) {
  }

  getTruncatedReservations(): Observable<TruncatedReservation[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<TruncatedReservation[]>(ServerUrlsService.getTruncatedReservationsUrl(), {headers});
  }
}
