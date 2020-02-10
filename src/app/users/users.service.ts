import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {ServerUrlsService} from '../server-urls.service';
import {User} from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.get<User[]>(ServerUrlsService.getUsersUrl(), {headers});
  }

  deleteUser(username: string): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    return this.httpClient.delete(ServerUrlsService.deleteUserUrl(username), {headers});
  }

  editUser(user: User, username: string): Observable<any> {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(ServerUrlsService.editUserUrl(username), user, {headers});
  }

  createUser(newUser: User) {
    const headers = new HttpHeaders({Authorization: LoginService.getAuthHeader()});
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(ServerUrlsService.createUserUrl(), newUser, {headers});
  }
}
