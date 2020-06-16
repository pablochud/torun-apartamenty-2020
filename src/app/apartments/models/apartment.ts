import {Lock} from './lock';
import {NotesSet} from './notes-set';

export class Apartment {
  id: number;
  apartmentId: number;
  idoSellKeyName: string;
  name: string;
  lock: Lock;
  notes: NotesSet;
  cleanersPasscodes: string[];

  constructor(lock: Lock, notes: NotesSet) {
    this.lock = lock;
    this.notes = notes;
  }
}
