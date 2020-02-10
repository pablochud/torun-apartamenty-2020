import {NoteLanguage} from './note-language.enum';

export class Note {
  id: number;
  content: string;
  language: NoteLanguage;

  constructor(language: NoteLanguage) {
    this.language = language;
  }
}
