import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ReservationData} from './models/ReservationData';
import {AdminPanelService} from './admin-panel.service';
import {AdditionalData} from './models/additional-data';
import {NoteStatus} from './models/NoteStatus';
import {PasscodeStatus} from './models/PasscodeStatus';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  reservations: ReservationData[] = [];
  originalReservations: ReservationData[] = [];
  displayedColumns: string[] = ['reservationId', 'reservationIdCustom', 'startDate', 'endDate', 'daysNumber', 'guestsNumber', 'lockName',
    'passcodeStatus', 'noteStatus', 'clientName', 'price', 'receipt', 'internalNote', 'note'];
  dataSource = new MatTableDataSource(this.reservations);
  @ViewChild(MatSort) sort: MatSort;
  lastDate = new Date();
  selectedDate = this.lastDate;
  noteStatuses = NoteStatus;
  passcodeStatuses = PasscodeStatus;
  wasInit = false;
  showSpinner = true;

  constructor(private adminPanelService: AdminPanelService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  init() {
    // this.showSpinner = true;
    this.dataSource.sort = this.sort;
    this.adminPanelService.getReservations(this.getMonth(this.selectedDate.getMonth()), this.selectedDate.getFullYear())
      .subscribe(reservations => {
        this.reservations = reservations;
        this.originalReservations = this.copyReservations(reservations);
        this.dataSource = new MatTableDataSource(this.reservations);
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się pobrać rezerwacji!\n' + error.error.message);
        this.showSpinner = false;
      });
    this.wasInit = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getMonth(month: number): string {
    switch (month) {
      case 0:
        return 'JANUARY';
      case 1:
        return 'FEBRUARY';
      case 2:
        return 'MARCH';
      case 3:
        return 'APRIL';
      case 4:
        return 'MAY';
      case 5:
        return 'JUNE';
      case 6:
        return 'JULY';
      case 7:
        return 'AUGUST';
      case 8:
        return 'SEPTEMBER';
      case 9:
        return 'OCTOBER';
      case 10:
        return 'NOVEMBER';
      case 11:
        return 'DECEMBER';
    }
  }

  reloadReservations() {
    if (this.lastDate.getMonth() !== this.selectedDate.getMonth() || this.lastDate.getFullYear() !== this.selectedDate.getFullYear()) {
      this.showSpinner = true;
      this.reservations = [];
      this.originalReservations = [];
      this.adminPanelService.getReservations(this.getMonth(this.selectedDate.getMonth()), this.selectedDate.getFullYear())
        .subscribe(reservations => {
          this.reservations = reservations;
          this.originalReservations = this.copyReservations(reservations);
          this.dataSource = new MatTableDataSource(this.reservations);
          this.dataSource.sort = this.sort;
          this.lastDate = this.selectedDate;
          this.showSpinner = false;
        }, (error: HttpErrorResponse) => {
          this.openSnackBar('Nie udało się pobrać rezerwacji dla daty ' + this.selectedDate + '!\n' + error.error.message);
          this.showSpinner = false;
        });
    }
  }

  private copyReservations(reservations: ReservationData[]): ReservationData[] {
    const myClonedArray = [];
    reservations.map(val => myClonedArray.push(Object.assign({}, val)));
    return myClonedArray;
  }

  getTotalPrice(): string {
    return this.dataSource.filteredData
      .map(t => t.price)
      .filter(t => t !== null && t !== undefined)
      .reduce((acc, value) => acc + value, 0)
      .toFixed(2) + 'zł';
  }

  getTotalGuests(): string {
    const guests = this.dataSource.filteredData
      .map(t => t.guestsNumber)
      .filter(t => t !== null && t !== undefined)
      .reduce((acc, value) => acc + value, 0);
    return String(guests) + (guests === 1 ? ' gość' : ' gości');
  }

  getTotalDaysNumber(): string {
    const days = this.dataSource.filteredData
      .map(t => t.daysNumber)
      .filter(t => t !== null && t !== undefined)
      .reduce((acc, value) => acc + value, 0);
    return String(days) + (days === 1 ? ' dzień' : ' dni');
  }

  saveChanges() {
    this.reservations.forEach((item: ReservationData, index: number) => {
      if (item.note !== this.originalReservations[index].note || item.receipt !== this.originalReservations[index].receipt) {
        this.adminPanelService.editAdditionalData(new AdditionalData(
          item.reservationId,
          item.reservationIdCustom,
          item.apartmentId,
          item.receipt,
          item.note
        )).subscribe(() => {
          this.openSnackBar('Udało się zapisać zmiany w wierszu dla: numer rezerwacji - ' + item.reservationId +
            ', numer apartamentu - ' + item.apartmentId + '!');
        }, (error: HttpErrorResponse) => {
          this.openSnackBar('Nie udało się zapisać zmiany w wierszu dla: numer rezerwacji - ' + item.reservationId +
            ', numer apartamentu - ' + item.apartmentId + '!\n' + error.error.message);
        });
      }
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
