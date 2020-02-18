import {Component, OnInit} from '@angular/core';
import {User} from './models/User';
import {ROLE} from './models/Role';
import {UsersService} from './users.service';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import { ApartmentsService } from './../apartments/apartments.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  originalUsers: User[] = [];
  newUser: User = new User();
  apartments = [];
  roles = [{id: ROLE.DEVELOPER.valueOf(), name: 'Developer'},
    {id: ROLE.OWNER.valueOf(), name: 'Owner'},
    {id: ROLE.USER.valueOf(), name: 'User'}];
  step = -1;
  wasInit = false;
  showSpinner = true;

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private apartmentsService: ApartmentsService) {
  }

  ngOnInit() {
  }

  init() {
    this.loadUsers();
    this.loadApartmens();
  }

  private loadUsers() {
    this.setStep(-1);
    this.users = [];
    this.originalUsers = [];
    this.showSpinner = true;
    this.usersService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.originalUsers = this.copyUsers(users);
        this.showSpinner = false;
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się wczytać użytkowników!\n' + error.error.message);
        this.showSpinner = false;
      });
    this.wasInit = true;
  }

  private loadApartmens(): void {
    this.apartmentsService.getApartments().subscribe(apartments => {
      this.apartments = apartments;
    });
  }

  private copyUsers(reservations: User[]): User[] {
    const myClonedArray = [];
    reservations.map(val => myClonedArray.push(Object.assign({}, val)));
    return myClonedArray;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextUser() {
    this.step++;
  }

  compareRole(o1: any, o2: any): boolean {
    return ROLE[o1] === o2;
  }

  deleteUser(username: string) {
    this.usersService.deleteUser(username).subscribe(() => {
        this.openSnackBar('Udało się usunąć użytkownika - ' + username + '!');
        this.loadUsers();
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się usunąć użytkownika - ' + username + '!\n' + error.error.message);
      }
    );
  }

  updateUser(i: number, username: string) {
    const userForEdit = this.users[i];
    const originalUser = this.originalUsers[i];
    this.usersService.editUser(userForEdit, originalUser.username).subscribe(() => {
      this.openSnackBar('Udało się edytować użytkownika - ' + username + '!');
      this.loadUsers();
    }, (error: HttpErrorResponse) => {
      this.openSnackBar('Nie udało się edytować użytkownika - ' + username + '!\n' + error.error.message);
    });
  }

  createUser() {
    this.usersService.createUser(this.newUser).subscribe(() => {
      this.openSnackBar('Udało się dodać nowego użytkownika!');
      this.clearNewUser();
      this.loadUsers();
    }, (error: HttpErrorResponse) => {
      this.openSnackBar('Nie udało się dodać nowego użytkownika!\n' + error.error.message);
    });
  }

  clearNewUser() {
    this.newUser = new User();
  }

  openSnackBar(text: string) {
    this.snackBar.open(text, 'Zamknij', {
      duration: 5000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
