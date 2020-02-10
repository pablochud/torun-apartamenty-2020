import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ServerUrlsService} from '../server-urls.service';
import {Observable} from 'rxjs';
import {ROLE} from '../users/models/Role';
import {User} from '../users/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {

  }

  public static isLoginIn(): boolean {
    return sessionStorage.getItem('currentUser') !== null;
  }

  public static loginSuccess(username: string, role: ROLE) {
    sessionStorage.setItem('currentUser', username);
    sessionStorage.setItem('role', role);
  }

  public static loginFailure() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('authHeader');
  }

  public static getAuthHeader(): string {
    return sessionStorage.getItem('authHeader');
  }

  public static getRole(): ROLE {
    return ROLE[sessionStorage.getItem('role')];
  }

  private static saveAuthHeader(username: string, password: string) {
    const credentials = username + ':' + password;
    const authHeader = 'Basic ' + btoa(credentials);
    sessionStorage.setItem('authHeader', authHeader);
  }

  public login(username: string, password: string): Observable<User> {
    LoginService.saveAuthHeader(username, password);
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<User>(ServerUrlsService.getUserUrl(username), {headers});
  }
}
