export class AdditionalData {
  reservationId: number;
  apartmentId: number;
  receipt: string;
  note: string;

  constructor(reservationId: number, apartmentId: number, receipt: string, note: string) {
    this.reservationId = reservationId;
    this.apartmentId = apartmentId;
    this.receipt = receipt;
    this.note = note;
  }
}
