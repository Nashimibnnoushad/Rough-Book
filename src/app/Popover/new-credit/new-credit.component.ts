import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { Common } from 'src/app/models/common';
import { Globalvariables } from 'src/app/models/globalvariables';
import { VariablesService } from 'src/app/variables.service';

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.scss'],
})
export class NewCreditComponent implements OnInit {
  date
  Amount
  Spend
  time
  transactionlist: Transaction[] = []
  Language
  variable: Globalvariables = new Globalvariables()
  constructor(private popover: PopoverController, private variableservice:VariablesService) {
    this.Language = variableservice.language
    let d = new Date()
    this.date = new Date().toISOString();
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
  }
  Save() {
    let t = new Date()
    this.time = this.FormatTime(t)
    this.date = this.formatDate(this.date)
    if (this.transactionlist == null) {
      let uniqueId = "T" + Common.NewId();
      let trans: Transaction = new Transaction()
      trans.Id = uniqueId
      trans.Date = this.date
      trans.Time = this.FormatTimeTo12(this.time)
      trans.Debit = 0
      trans.Credit = this.Amount
      trans.Comment = this.Spend
      trans.Ledgerid = 'Not a ledger'
      trans.Mode = 'credit'
      var templist = []
      templist.push(trans)
      localStorage.setItem("Transaction", JSON.stringify(templist));
      this.variable.Credit = this.variable.Credit + this.Amount
      if(this.variable.Debit>this.variable.Credit){
        this.variable.Balance = this.variable.Debit - this.variable.Credit
      }
      else if(this.variable.Debit<this.variable.Credit){
        this.variable.Overflow = this.variable.Credit - this.variable.Debit
      }
      this.ClosePopOver()
    }
    else if (this.transactionlist != null) {
      let uniqueId = "T" + Common.NewId();
      let trans: Transaction = new Transaction()
      trans.Id = uniqueId
      trans.Date = this.date
      trans.Time = this.FormatTimeTo12(this.time)
      trans.Debit = 0
      trans.Credit = this.Amount
      trans.Comment = this.Spend
      trans.Ledgerid = 'Not a ledger'
      trans.Mode = 'credit'
      this.transactionlist.push(trans)
      localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
      this.variable.Credit = this.variable.Credit + this.Amount
      if(this.variable.Debit>this.variable.Credit){
        this.variable.Balance = this.variable.Debit - this.variable.Credit
      }
      else if(this.variable.Debit<this.variable.Credit){
        this.variable.Overflow = this.variable.Credit - this.variable.Debit
      }
      this.ClosePopOver()
    }

  }
  Cancel() {
    this.ClosePopOver()
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
  FormatTime(time) {
    var d = new Date(time),
      hours = '' + (d.getHours()),
      minutes = '' + d.getMinutes(),
      seconds = d.getSeconds();


    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;


    return [hours, minutes].join(':');
  }
  FormatTimeTo12(a) {
    return (new Date("1955-11-05T" + a + "Z")).toLocaleTimeString("bestfit", {
      timeZone: "UTC",
      hour12: !0,
      hour: "numeric",
      minute: "numeric"
    });
  };
  ClosePopOver() {
    this.popover.dismiss();
  }

  ngOnInit() { }

}

