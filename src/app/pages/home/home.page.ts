import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { NewDebitComponent } from 'src/app/Popover/new-debit/new-debit.component';
import { PopoverController } from '@ionic/angular';
import { NewCreditComponent } from 'src/app/Popover/new-credit/new-credit.component';
import { NewLedgerComponent } from 'src/app/Popover/new-ledger/new-ledger.component';
import { Transaction } from 'src/app/models/transaction';
import { Globalvariables } from 'src/app/models/globalvariables';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import { Common } from 'src/app/models/common';
import { VariablesService } from 'src/app/variables.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 0.01;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  date
  month
  year
  displaymonth
  Language
  transactionlist: Transaction[] = []
  temptransactionlist: Transaction[] = []
  variable: Globalvariables = new Globalvariables()
  constructor(private popover: PopoverController, private ref: ChangeDetectorRef, private variableservice:VariablesService) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.Language = variableservice.language
    let d = new Date()
    this.date = this.formatDate(d)
    this.month = this.date.slice(3, 5)
    this.year = this.date.slice(6)
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    let previousdate = dte.toString()
    previousdate = this.formatDate(previousdate)
    this.variable.Debit = 0
    this.variable.Credit = 0
    this.variable.Balance = 0
    this.variable.Overflow = 0
    this.displaymonth = d.toLocaleString('default', { month: 'long' })
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == this.date.slice(3))
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        if (this.temptransactionlist[i].Mode == 'debit') {
          this.variable.Debit = this.variable.Debit + this.temptransactionlist[i].Debit
        }
        else if (this.temptransactionlist[i].Mode == 'credit') {
          this.variable.Credit = this.variable.Credit + this.temptransactionlist[i].Credit
        }
      }
      if (this.variable.Debit > this.variable.Credit) {
        this.variable.Balance = this.variable.Debit - this.variable.Credit
      }
      else if (this.variable.Debit < this.variable.Credit) {
        this.variable.Overflow = this.variable.Credit - this.variable.Debit
      }
    }
    if (this.temptransactionlist.length == 0 && this.date.slice(0, 2) == '01') {
      let previousmonthtransactionlist: Transaction[] = []
      if (this.transactionlist != null) {
        previousmonthtransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == previousdate.slice(3))
        let tempdebit = 0
        let tempcredit = 0
        let tempbalance = 0
        let tempoverflow = 0
        for (let i = 0; i < previousmonthtransactionlist.length; i++) {
          if (previousmonthtransactionlist[i].Mode == 'debit') {
            tempdebit = tempdebit + previousmonthtransactionlist[i].Debit
          }
          else if (previousmonthtransactionlist[i].Mode == 'credit') {
            tempcredit = tempcredit + previousmonthtransactionlist[i].Credit
          }
        }
        if (tempdebit > tempcredit) {
          tempbalance = tempdebit - tempcredit
        }
        if (tempdebit < tempcredit) {
          tempoverflow = tempcredit - tempdebit
        }
        if (tempbalance != 0) {
          let t = new Date()
          var time = this.FormatTime(t)
          let uniqueId = "T" + Common.NewId();
          let trans: Transaction = new Transaction()
          trans.Id = uniqueId
          trans.Date = this.date
          trans.Time = this.FormatTimeTo12(time)
          trans.Debit = tempbalance
          trans.Credit = 0
          trans.Comment = 'Previous Month Balance'
          trans.Ledgerid = 'Not a ledger'
          trans.Mode = 'debit'
          this.transactionlist.push(trans)
          localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
          this.variable.Debit = this.variable.Debit + tempbalance
          if (this.variable.Debit > this.variable.Credit) {
            this.variable.Balance = this.variable.Debit - this.variable.Credit
          }
          else if (this.variable.Debit < this.variable.Credit) {
            this.variable.Overflow = this.variable.Credit - this.variable.Debit
          }
        }
      }
    }
  }
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }
  FormatTimeTo12(a) {
    return (new Date("1955-11-05T" + a + "Z")).toLocaleTimeString("bestfit", {
      timeZone: "UTC",
      hour12: !0,
      hour: "numeric",
      minute: "numeric"
    });
  };
  FormatTime(time) {
    var d = new Date(time),
      hours = '' + (d.getHours()),
      minutes = '' + d.getMinutes(),
      seconds = d.getSeconds();


    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;


    return [hours, minutes].join(':');
  }
  NewDebit(myEvent) {
    this.popover.create({ component: NewDebitComponent, showBackdrop: true }).then((popoverElement) => {
      popoverElement.present();
    })
  }
  NewCredit() {
    this.popover.create({ component: NewCreditComponent, showBackdrop: true }).then((popoverElement) => {
      popoverElement.present();
    })
  }
  NewLedger() {
    this.popover.create({ component: NewLedgerComponent, showBackdrop: true }).then((popoverElement) => {
      popoverElement.present();
    })
  }
  Refresh() {
    let d = new Date()
    this.date = this.formatDate(d)
    this.month = this.date.slice(3, 5)
    this.year = this.date.slice(6)
    let dte = new Date();
    dte.setDate(dte.getDate() - 1);
    let previousdate = dte.toString()
    previousdate = this.formatDate(previousdate)
    this.variable.Debit = 0
    this.variable.Credit = 0
    this.variable.Balance = 0
    this.variable.Overflow = 0
    this.displaymonth = d.toLocaleString('default', { month: 'long' })
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == this.date.slice(3))
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        if (this.temptransactionlist[i].Mode == 'debit') {
          this.variable.Debit = this.variable.Debit + this.temptransactionlist[i].Debit
        }
        else if (this.temptransactionlist[i].Mode == 'credit') {
          this.variable.Credit = this.variable.Credit + this.temptransactionlist[i].Credit
        }
      }
      if (this.variable.Debit > this.variable.Credit) {
        this.variable.Balance = this.variable.Debit - this.variable.Credit
      }
      else if (this.variable.Debit < this.variable.Credit) {
        this.variable.Overflow = this.variable.Credit - this.variable.Debit
      }
    }
    // if (this.temptransactionlist.length == 0 && this.date.slice(0, 2) == '01') {
    //   let previousmonthtransactionlist: Transaction[] = []
    //   if (this.transactionlist != null) {
    //     previousmonthtransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == previousdate.slice(3))
    //     let tempdebit = 0
    //     let tempcredit = 0
    //     let tempbalance = 0
    //     let tempoverflow = 0
    //     for (let i = 0; i < previousmonthtransactionlist.length; i++) {
    //       if (previousmonthtransactionlist[i].Mode == 'debit') {
    //         tempdebit = tempdebit + previousmonthtransactionlist[i].Debit
    //       }
    //       else if (previousmonthtransactionlist[i].Mode == 'credit') {
    //         tempcredit = tempcredit + previousmonthtransactionlist[i].Credit
    //       }
    //     }
    //     if (tempdebit > tempcredit) {
    //       tempbalance = tempdebit - tempcredit
    //     }
    //     if (tempdebit < tempcredit) {
    //       tempoverflow = tempcredit - tempdebit
    //     }
    //     if (tempbalance != 0) {
    //       let t = new Date()
    //       var time = this.FormatTime(t)
    //       let uniqueId = "T" + Common.NewId();
    //       let trans: Transaction = new Transaction()
    //       trans.Id = uniqueId
    //       trans.Date = this.date
    //       trans.Time = this.FormatTimeTo12(time)
    //       trans.Debit = tempbalance
    //       trans.Credit = 0
    //       trans.Comment = 'Previous Month Balance'
    //       trans.Ledgerid = 'Not a ledger'
    //       trans.Mode = 'debit'
    //       this.transactionlist.push(trans)
    //       localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
    //       this.variable.Debit = this.variable.Debit + tempbalance
    //       if (this.variable.Debit > this.variable.Credit) {
    //         this.variable.Balance = this.variable.Debit - this.variable.Credit
    //       }
    //       else if (this.variable.Debit < this.variable.Credit) {
    //         this.variable.Overflow = this.variable.Credit - this.variable.Debit
    //       }
    //     }
    //   }
    // }
  }
  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime)
      this.remainingTime = this.remainingTime / 1000;
      if (this.remainingTime <= 0) {
        this.Refresh()
        this.SearchDate = moment();
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
        this.TimerExpired.emit();
      }
      else {
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
      }
      this.ref.markForCheck()
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
