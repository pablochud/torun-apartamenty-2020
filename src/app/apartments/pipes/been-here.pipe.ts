import { Pipe, PipeTransform } from '@angular/core';
import { Apartment } from '../models/apartment';
import { Notification } from '../models/notification';
import { ApartmentsService } from '../apartments.service';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({name: 'beenhere'})
export class BeenHere implements PipeTransform {
  data$: Observable<Notification[]>;

  constructor(
      private apartmentsService: ApartmentsService
  ) {
    // this.data$ =  this.apartmentsService.getNotification().pipe(shareReplay(1));
  }

  transform(apartment: Apartment): Observable<any> {
    return this.apartmentsService.getNotification(apartment.id);
        // return this.data$.pipe(
        //   map((resp: Notification[]) => {
        //     return resp.find(notification => {
        //       return notification.idoSellKeyName === apartment.idoSellKeyName &&
        //         +notification.lockId === +apartment.lock.id;
        //     });
        //   })
        // );

  }
}
