import {Component, OnInit, ViewChild} from '@angular/core';
import {LogsService} from './logs.service';
import {LogsType} from './logs-type.enum';
import {SpecificLogComponent} from './specific-log/specific-log.component';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(public logsService: LogsService) {
  }

  @ViewChild('infoLogs') private infoLogs: SpecificLogComponent;
  @ViewChild('errorLogs') private errorLogs: SpecificLogComponent;
  @ViewChild('warnLogs') private warnLogs: SpecificLogComponent;
  @ViewChild('debugLogs') private debugLogs: SpecificLogComponent;
  @ViewChild('traceLogs') private traceLogs: SpecificLogComponent;
  @ViewChild('fatalLogs') private fatalLogs: SpecificLogComponent;
  logsTypes = LogsType;
  wasInit = false;

  ngOnInit() {

  }

  init() {
    this.infoLogs.init();
    this.errorLogs.init();
    this.warnLogs.init();
    this.wasInit = true;
  }

}
