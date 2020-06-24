import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';
import {ApartmentsService} from './apartments.service';
import {Apartment} from './models/apartment';
import {LockService} from './models/lock-service.enum';
import {IdoSellKeyName} from './models/idoSellKeyName.enum';
import {Lock} from './models/lock';
import {NotesSet} from './models/notes-set';
import {Note} from './models/note';
import {NoteLanguage} from './models/note-language.enum';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {RecordTableDialogComponent} from './dialogs/record-table-dialog/record-table-dialog.component';
import {MatDialog} from '@angular/material/dialog';

import {ROLE} from '../users/models/Role';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApartmentsComponent implements OnInit {

  apartments: Apartment[] = [];
  originalApartments: Apartment[] = [];
  newApartment: Apartment = new Apartment(new Lock(), new NotesSet(new Note(NoteLanguage.ENG), new Note(NoteLanguage.POL)));
  idoSellKeyNameList = [
    {id: 'BRT', name: IdoSellKeyName.BRT},
    {id: 'TMK', name: IdoSellKeyName.TMK},
    {id: 'RNT', name: IdoSellKeyName.RNT}
  ];
  services = [{id: LockService.TTLock.valueOf(), name: 'TTLock'}, {id: LockService.RemoteLock.valueOf(), name: 'RemoteLock'}];
  step = -1;
  wasInit = false;
  showSpinner = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  removable = true;
  addOnBlur = true;

  constructor(
    private apartmentsService: ApartmentsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
    ) {
  }

  private static isUndefinedOrNull(val: any): boolean {
    return val === undefined || val === null;
  }

  ngOnInit() {
  }

  init(): void {
    this.loadApartments();
  }

  private loadApartments() {
    this.setStep(-1);
    this.apartments = [];
    this.originalApartments = [];
    this.apartmentsService.getApartments()
      .subscribe(apartments => {
        this.saveApartments(apartments);
        this.showSpinner = false;
        this.cdr.markForCheck();
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się wczytać apartamentów!\n' + error.error.message);
        this.showSpinner = false;
        this.cdr.markForCheck();
      });
    this.wasInit = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextApartment() {
    this.step++;
  }

  compareService(o1: any, o2: any): boolean {
    return LockService[o1] === o2;
  }

  public getIdoSellName(name: string): string {
    return IdoSellKeyName[name];
  }

  deleteApartment(id: number) {
    this.apartmentsService.deleteApartment(id).subscribe(() => {
        this.openSnackBar('Udało się usunąć apartament - ' + id + '!');
        this.loadApartments();
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się usunąć apartamentu - ' + id + '!\n' + error.error.message);
      }
    );
  }

  updateApartment(i: number, id: number) {
    const apartmentForEdit = this.apartments[i];
    const originalApartment = this.originalApartments[i];
    this.apartmentsService.editApartment(apartmentForEdit, originalApartment.id).subscribe(() => {
      this.openSnackBar('Udało się edytować apartament - ' + id + '!');
      this.loadApartments();
    }, (error: HttpErrorResponse) => {
      this.openSnackBar('Nie udało się edytować apartamentu - ' + id + '!\n' + error.error.message);
    });
  }

  private saveApartments(apartments: Apartment[]) {
    this.apartments = apartments;
    this.apartments.forEach(apartment => {
      if (ApartmentsComponent.isUndefinedOrNull(apartment.lock)) {
        apartment.lock = new Lock();
      }
      if (ApartmentsComponent.isUndefinedOrNull(apartment.notes)) {
        apartment.notes = new NotesSet(new Note(NoteLanguage.ENG), new Note(NoteLanguage.POL));
      }
      if (ApartmentsComponent.isUndefinedOrNull(apartment.notes.polNote)) {
        apartment.notes.polNote = new Note(NoteLanguage.POL);
      }
      if (ApartmentsComponent.isUndefinedOrNull(apartment.notes.engNote)) {
        apartment.notes.engNote = new Note(NoteLanguage.ENG);
      }
    });
    this.originalApartments = this.copyApartments(this.apartments);
  }

  private copyApartments(reservations: Apartment[]): Apartment[] {
    const myClonedArray = [];
    reservations.map(val => myClonedArray.push(Object.assign({}, val)));
    return myClonedArray;
  }

  createApartment() {
    this.apartmentsService.createApartment(this.newApartment).subscribe(() => {
      this.openSnackBar('Udało się dodać nowy apartament - ' + this.newApartment.id + '!');
      this.loadApartments();
      this.clearNewApartment();
    }, (error: HttpErrorResponse) => {
      this.openSnackBar('Nie udało się dodać nowego apartamentu!\n' + error.error.message);
    });
  }

  clearNewApartment() {
    this.newApartment = new Apartment(new Lock(), new NotesSet(new Note(NoteLanguage.ENG), new Note(NoteLanguage.POL)));
  }

  openSnackBar(text: string) {
    this.snackBar.open(text, 'Zamknij', {
      duration: 5000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  add(event: MatChipInputEvent, apartment: Apartment): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (apartment.cleanersPasscodes === undefined) {
        apartment.cleanersPasscodes = new Array();
      }
      apartment.cleanersPasscodes.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tags: string, apartment: Apartment): void {
    const index = apartment.cleanersPasscodes.indexOf(tags);

    if (index >= 0) {
      apartment.cleanersPasscodes.splice(index, 1);
    }
  }

  public openRecordTableDialog(event: Event, apartment: Apartment): void {
    event.stopPropagation();
    if (!this.isSprzataczka()) {
      this.dialog.open(RecordTableDialogComponent, {
        data: {
          apartment
        },
        minWidth: '40vw'
      });
    }
  }

  isExpansionDisabled(): string {
    if (this.isSprzataczka()) {
      return 'disabled-pointer';
    }
    return '';
  }

  isSprzataczka(): boolean {
    return LoginService.getRole() === ROLE.SPRZATACZKA;
  }

}
