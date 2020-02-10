import {Note} from './note';

export class NotesSet {
  id: number;
  engNote: Note;
  polNote: Note;

  constructor(engNote: Note, polNote: Note) {
    this.engNote = engNote;
    this.polNote = polNote;
  }
}
