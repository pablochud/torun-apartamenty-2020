import { Injectable } from '@angular/core';
import {LoginService} from '../login/login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RecordsList} from './models/recordsList';
import {ServerUrlsService} from '../server-urls.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private httpClient: HttpClient) { }

  getRecordListByLock(lockId: number, keyname: string): Observable<RecordsList[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<RecordsList[]>(`${ServerUrlsService.getRecordListByLockUrl(lockId)}/?keyname=${keyname}`, { headers });
  }
}
