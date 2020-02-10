import {Component, OnInit} from '@angular/core';
import {ApartmentsService} from './apartments.service';
import {Apartment} from './models/apartment';
import {LockService} from './models/lock-service.enum';
import {Lock} from './models/lock';
import {NotesSet} from './models/notes-set';
import {Note} from './models/note';
import {NoteLanguage} from './models/note-language.enum';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {

  apartments: Apartment[] = [];
  originalApartments: Apartment[] = [];
  newApartment: Apartment = new Apartment(new Lock(), new NotesSet(new Note(NoteLanguage.ENG), new Note(NoteLanguage.POL)));
  services = [{id: LockService.TTLock.valueOf(), name: 'TTLock'}, {id: LockService.RemoteLock.valueOf(), name: 'RemoteLock'}];
  step = -1;
  wasInit = false;
  showSpinner = false;

  constructor(private apartmentsService: ApartmentsService, private snackBar: MatSnackBar) {
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
    this.showSpinner = true;
    this.apartmentsService.getApartments()
      .subscribe(apartments => {
        this.saveApartments(apartments);
        this.showSpinner = false;
      }, (error: HttpErrorResponse) => {
        this.openSnackBar('Nie udało się wczytać apartamentów!\n' + error.error.message);
        this.showSpinner = false;
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
}
