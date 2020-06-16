import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Apartment} from '../../models/apartment';
import {RecordsService} from 'src/app/records/records.service';
import {RecordsList} from 'src/app/records/models/recordsList';
import {MatTableDataSource} from '@angular/material/table';
import {RecordType} from 'src/app/records/models/recordType';

export interface DialogData {
  apartment: Apartment;
}

@Component({
  selector: 'app-record-table-dialog',
  templateUrl: './record-table-dialog.component.html',
  styleUrls: ['./record-table-dialog.component.scss']
})
export class RecordTableDialogComponent implements OnInit {

  displayedColumns: string[] = ['recordType', 'username', 'keyboardPwd', 'lockDate'];
  records: RecordsList[] = [];
  dataSource = new MatTableDataSource(this.records);
  isLoadingResults = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private recordsService: RecordsService
    ) { }

  ngOnInit() {
    this.recordsService.getRecordListByLock(+this.data.apartment.lock.id, this.data.apartment.idoSellKeyName)
    .subscribe(resp => {
        this.records = resp;
        this.dataSource = new MatTableDataSource(this.records);
        this.isLoadingResults = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecordType(type: number) {
    return RecordType[type] || type;
  }

}
