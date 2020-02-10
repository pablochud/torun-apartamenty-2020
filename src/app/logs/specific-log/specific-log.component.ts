import {Component, Input, OnInit} from '@angular/core';
import {LogsType} from '../logs-type.enum';
import {LogsService} from '../logs.service';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.scss']
})
export class SpecificLogComponent implements OnInit {

  @Input() type: LogsType;
  @Input() logsService: LogsService;
  logs: string[] = [];
  startFromLine = 0;
  lines = 30;
  showSpinner = false;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  init() {
    this.loadLogs();
  }

  reloadLogs() {
    this.loadLogs();
  }

  private loadLogs() {
    this.showSpinner = true;
    this.logs = [];
    this.logsService.getLogs(this.type, this.startFromLine, this.lines).subscribe(logs => {
      this.logs = logs;
      this.showSpinner = false;
    }, (error: HttpErrorResponse) => {
      this.openSnackBar('Nie udało się wczytać logów ' + this.type + '!\n' + error.error.message);
      this.showSpinner = false;
    });
  }

  openSnackBar(text: string) {
    this.snackBar.open(text, 'Zamknij', {
      duration: 5000,
      direction: 'ltr',
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
