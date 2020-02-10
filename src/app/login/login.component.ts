import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (LoginService.isLoginIn() === true) {
      this.router.navigateByUrl('main');
    }
  }

  login() {
    this.loginService.login(this.username, this.password)
      .subscribe(user => {
        LoginService.loginSuccess(user.username, user.role);
        this.router.navigateByUrl('main');
      }, (error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 500) {
          this.openSnackBar('Niepoprawny login lub hasło!');
        } else {
          this.openSnackBar('Coś poszło nie tak, spróbuj ponownie później!');
        }
        LoginService.loginFailure();
      });
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
