import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';
import {MatTabChangeEvent, MatTabGroup} from '@angular/material';
import {ROLE} from '../users/models/Role';
import {ReservationsComponent} from '../reservations/reservations.component';
import {AdminPanelComponent} from '../admin-panel/admin-panel.component';
import {ApartmentsComponent} from '../apartments/apartments.component';
import {UsersComponent} from '../users/users.component';
import {LogsComponent} from '../logs/logs.component';
import {TabsLabels} from './TabsLabels';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') private tabGroup: MatTabGroup;
  @ViewChild(AdminPanelComponent) private adminPanelComponent: AdminPanelComponent;
  @ViewChild(ReservationsComponent) private reservationsComponent: ReservationsComponent;
  @ViewChild(ApartmentsComponent) private apartmentsComponent: ApartmentsComponent;
  @ViewChild(UsersComponent) private usersComponent: UsersComponent;
  @ViewChild(LogsComponent) private logsComponent: LogsComponent;

  tabsLabels = TabsLabels;
  idoSellList: { id: number, name: string };
  selected: number;

  constructor(
    private router: Router,
    private mainService: MainService) {
  }

  ngOnInit() {
    if (LoginService.isLoginIn() === false) {
      this.router.navigateByUrl('login');
    }
    // this.mainService.getIdoSellList().subscribe(response => {
    //   console.log(response);
    //   this.idoSellList = response;
    //   this.selected = response[0].id;
    //   // TODO
    //   // endpointBackend.setAuthorizationData(this.selected)
    // });
  }

  ngAfterViewInit(): void {
    const textLabel = this.tabGroup._tabs.toArray()[0].textLabel;
    if (textLabel === this.tabsLabels.ADMIN_PANEL && !this.adminPanelComponent.wasInit) {
      this.adminPanelComponent.init();
    } else if (textLabel === this.tabsLabels.RESERVATIONS && !this.reservationsComponent.wasInit) {
      this.reservationsComponent.init();
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    switch (event.tab.textLabel) {
      case this.tabsLabels.LOGOUT:
        this.logout();
        break;
      case this.tabsLabels.ADMIN_PANEL: {
        if (!this.adminPanelComponent.wasInit) {
          this.adminPanelComponent.init();
        }
        break;
      }
      case this.tabsLabels.RESERVATIONS: {
        if (!this.reservationsComponent.wasInit) {
          this.reservationsComponent.init();
        }
        break;
      }
      case this.tabsLabels.APARTMENTS: {
        if (!this.apartmentsComponent.wasInit) {
          this.apartmentsComponent.init();
        }
        break;
      }
      case this.tabsLabels.USERS: {
        if (!this.usersComponent.wasInit) {
          this.usersComponent.init();
        }
        break;
      }
      case this.tabsLabels.LOGS: {
        if (!this.logsComponent.wasInit) {
          this.logsComponent.init();
        }
        break;
      }
    }
  }

  logout() {
    LoginService.loginFailure();
    this.router.navigateByUrl('login');
  }

  isUser(): boolean {
    return LoginService.getRole() === ROLE.USER;
  }

  isOwner(): boolean {
    return LoginService.getRole() === ROLE.OWNER;
  }

  isDeveloper(): boolean {
    return LoginService.getRole() === ROLE.DEVELOPER;
  }
}
