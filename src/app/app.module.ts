import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NewCreditComponent } from './Popover/new-credit/new-credit.component';
import { NewDebitComponent } from './Popover/new-debit/new-debit.component';
import { NewLedgerComponent } from './Popover/new-ledger/new-ledger.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditdailybookComponent } from './Popover/editdailybook/editdailybook.component';
import { EditprofileComponent } from './Popover/editprofile/editprofile.component';

@NgModule({
  declarations: [AppComponent, NewCreditComponent, NewDebitComponent, NewLedgerComponent,
     EditdailybookComponent, EditprofileComponent],
  entryComponents: [NewCreditComponent, NewDebitComponent, NewLedgerComponent, 
    EditdailybookComponent, EditprofileComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
