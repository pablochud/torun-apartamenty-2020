import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {ServerUrlsService} from '../server-urls.service';
import {LogsType} from './logs-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private httpClient: HttpClient) {
  }

  getLogs(type: LogsType, startFromLine: number, lines: number): Observable<string[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    const params = new HttpParams().append('startFromLine', String(startFromLine)).append('lines', String(lines));
    return this.httpClient.get<string[]>(ServerUrlsService.getLogsUrl(type), {headers, params});
  }
}
