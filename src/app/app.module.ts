import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CustomMaterialModule} from './core/material.module';
import {AppRoutingModule} from './core/app.routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ApartmentsComponent} from './apartments/apartments.component';
import {MainComponent} from './main/main.component';
import {ReservationsComponent} from './reservations/reservations.component';
import {DateFormatPipe} from './date-format.pipe';
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {TimeFormatPipe} from './time-format.pipe';
import {LogsComponent} from './logs/logs.component';
import {SpecificLogComponent} from './logs/specific-log/specific-log.component';
import {UsersComponent} from './users/users.component';
import { AmountWithCommaPipe } from './amount-with-comma.pipe';
import { NewComponent } from './new/new.component';
import { BeenHere } from './apartments/pipes/been-here.pipe';
import { WithLoadingPipe } from './apartments/pipes/with-loading.pipe';
import {RecordTableDialogComponent} from './apartments/dialogs/record-table-dialog/record-table-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApartmentsComponent,
    MainComponent,
    ReservationsComponent,
    DateFormatPipe,
    DateTimeFormatPipe,
    AdminPanelComponent,
    TimeFormatPipe,
    LogsComponent,
    SpecificLogComponent,
    UsersComponent,
    AmountWithCommaPipe,
    NewComponent,
    BeenHere,
    WithLoadingPipe,
    RecordTableDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    RecordTableDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
