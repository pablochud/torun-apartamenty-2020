import {Lock} from './lock';
import {NotesSet} from './notes-set';

export class Apartment {
  id: number;
  name: string;
  lock: Lock;
  notes: NotesSet;

  constructor(lock: Lock, notes: NotesSet) {
    this.lock = lock;
    this.notes = notes;
  }
}
