export class AdditionalData {
  reservationId: number;
  reservationIdCustom: string;
  apartmentId: number;
  receipt: string;
  note: string;

  constructor(reservationId: number, reservationIdCustom: string, apartmentId: number, receipt: string, note: string) {
    this.reservationId = reservationId;
    this.reservationIdCustom = reservationIdCustom;
    this.apartmentId = apartmentId;
    this.receipt = receipt;
    this.note = note;
  }
}
