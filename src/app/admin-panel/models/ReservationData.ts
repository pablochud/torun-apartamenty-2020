import {PasscodeStatus} from './PasscodeStatus';
import {NoteStatus} from './NoteStatus';

export class ReservationData {
  reservationId: number;
  reservationIdCustom: string;
  addDate: Date;
  startDate: Date;
  endDate: Date;
  apartmentId: number;
  daysNumber: number;
  guestsNumber: number;
  lockName: string;
  passcodeStatus: PasscodeStatus;
  noteStatus: NoteStatus;
  clientName: string;
  price: number;
  receipt: string;
  internalNote: string;
  note: string;
}
