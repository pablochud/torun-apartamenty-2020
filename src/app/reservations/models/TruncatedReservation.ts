import {PasscodeStatus} from '../../admin-panel/models/PasscodeStatus';
import {NoteStatus} from '../../admin-panel/models/NoteStatus';

export class TruncatedReservation {
  reservationId: number;
  startDate: Date;
  endDate: Date;
  apartmentId: number;
  guestsNumber: number;
  lockName: string;
  passcodeStatus: PasscodeStatus;
  noteStatus: NoteStatus;
  clientPhoneNumber: string;
  clientNote: string;
  clientFirstName: string;
  clientLastName: string;
}
