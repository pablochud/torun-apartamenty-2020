import {LogsType} from './logs/logs-type.enum';

export class ServerUrlsService {

  private static prefix = 'https://torun-apartamenty-server-2020.herokuapp.com/api/';
  // private static prefix = 'http://127.0.0.1:8080/api/';


  public static getApartmentsUrl(): string {
    return ServerUrlsService.prefix + 'apartments';
  }

  static deleteApartmentUrl(id: number) {
    return ServerUrlsService.prefix + 'apartments/' + id;
  }

  static editApartmentUrl(id: number) {
    return ServerUrlsService.prefix + 'apartments/' + id;
  }

  static createApartmentUrl() {
    return ServerUrlsService.prefix + 'apartments';
  }

  static getTruncatedReservationsUrl() {
    return ServerUrlsService.prefix + 'reservations/truncated';
  }

  static getReservationsUrl() {
    return ServerUrlsService.prefix + 'reservations';
  }

  static editAdditionalDataUrl() {
    return ServerUrlsService.prefix + 'reservations/additional';
  }

  static getLogsUrl(type: LogsType) {
    return ServerUrlsService.prefix + 'logs/' + type;
  }

  public static getUserUrl(username: string): string {
    return ServerUrlsService.prefix + 'users/' + username;
  }

  static getUsersUrl() {
    return ServerUrlsService.prefix + 'users';
  }

  static deleteUserUrl(username: string) {
    return ServerUrlsService.prefix + 'users/' + username;
  }

  static editUserUrl(username: string) {
    return ServerUrlsService.prefix + 'users/' + username;
  }

  static createUserUrl() {
    return ServerUrlsService.prefix + 'users';
  }

  static pingUrl() {
    return ServerUrlsService.prefix + 'ping';
  }

  static getIdoSellList() {
    return ServerUrlsService.prefix + 'idosell';
  }
}
