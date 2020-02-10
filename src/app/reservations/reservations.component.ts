import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationsService} from './reservations.service';
import {TruncatedReservation} from './models/TruncatedReservation';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {NoteStatus} from '../admin-panel/models/NoteStatus';
import {PasscodeStatus} from '../admin-panel/models/PasscodeStatus';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: TruncatedReservation[] = [];
  displayedColumns: string[] = ['reservationId', 'startDate', 'endDate', 'guestsNumber', 'lockName',
    'passcodeStatus', 'noteStatus', 'clientFirstName', 'clientPhoneNumber', 'clientNote'];
  dataSource = new MatTableDataSource(this.reservations);
  @ViewChild(MatSort) sort: MatSort;
  noteStatuses = NoteStatus;
  passcodeStatuses = PasscodeStatus;
  wasInit = false;
  showSpinner = false;

  constructor(private reservationsService: ReservationsService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  init(): void {
    this.showSpinner = true;
    this.reservationsService.getTruncatedReservations()
      .subscribe(reservations => {
        this.reservations = reservations;
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

  openSnackBar(text: string) {
    this.snackBar.open(text, 'Zamknij', {
      duration: 5000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

}
