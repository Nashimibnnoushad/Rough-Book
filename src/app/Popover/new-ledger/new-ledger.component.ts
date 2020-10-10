import { Component, OnInit } from '@angular/core';
import { Ledger } from 'src/app/models/ledger';
import { Transaction } from 'src/app/models/transaction';
import { Globalvariables } from 'src/app/models/globalvariables';
import { PopoverController } from '@ionic/angular';
import { Common } from 'src/app/models/common';
import { VariablesService } from 'src/app/variables.service';

@Component({
  selector: 'app-new-ledger',
  templateUrl: './new-ledger.component.html',
  styleUrls: ['./new-ledger.component.scss'],
})
export class NewLedgerComponent implements OnInit {
ledgerlist: Ledger[]=[]
templedgerlist: Ledger[]=[]
transactionlist: Transaction[] = []
variable: Globalvariables = new Globalvariables()
date
Amount
Comment
time
Ledger
Ledgerid
mode
Language
sameledger:boolean
  constructor(private popover: PopoverController, private variableservice:VariablesService) { 
    this.Language = variableservice.language
    let d = new Date()
    this.date = new Date().toISOString();
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    this.ledgerlist = JSON.parse(localStorage.getItem("Ledger"))
    if(this.ledgerlist==null){
      this.ledgerlist = []
    }
  }
  SelectMode(value){
    console.log(value)
    if(value=='debit'){
      this.mode = 'debit'
    }
    else if(value=='credit'){
      this.mode = 'credit'
    }
  }
  Save() {
    let t = new Date()
    this.time = this.FormatTime(t)
    this.date = this.formatDate(this.date)
    if(this.ledgerlist==null){
      let uniqueId = "U" + Common.NewId();
      let ledger:Ledger = new Ledger()
      this.Ledgerid = uniqueId
      ledger.Id = uniqueId
      ledger.Name = this.Ledger
      let templist = []
      templist.push(ledger)
      localStorage.setItem("Ledger",JSON.stringify(templist));
    }
    else if(this.ledgerlist!=null){
      let templist: Ledger[]=[]
      templist = this.ledgerlist.filter(x=>x.Name == this.Ledger)
      if(templist.length!=0){
        this.Ledgerid = templist[0].Id
      }
      else if(templist.length==0){
        let uniqueId = "U" + Common.NewId();
        let ledger:Ledger = new Ledger()
        this.Ledgerid = uniqueId
        ledger.Id = uniqueId
        ledger.Name = this.Ledger
        this.ledgerlist.push(ledger)
        localStorage.setItem("Ledger",JSON.stringify(this.ledgerlist));
      }
    }
    if (this.transactionlist == null) {
      let uniqueId = "T" + Common.NewId();
      let trans: Transaction = new Transaction()
      trans.Id = uniqueId
      trans.Date = this.date
      trans.Time = this.FormatTimeTo12(this.time)
      trans.Ledgerid = this.Ledgerid
      trans.Ledgername = this.Ledger
      trans.Comment = this.Comment
      if(this.mode == 'debit'){
        trans.Credit = 0
        trans.Debit = this.Amount
        trans.Mode = 'debit'
      }
      else if(this.mode == 'credit'){
        trans.Credit = this.Amount
        trans.Debit = 0
        trans.Mode = 'credit'
      }
      var templist = []
      templist.push(trans)
      localStorage.setItem("Transaction", JSON.stringify(templist));
      this.variable.Debit = this.variable.Debit + this.Amount
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
      trans.Ledgerid = this.Ledgerid
      trans.Ledgername = this.Ledger
      trans.Comment = this.Comment
      if(this.mode == 'debit'){
        trans.Credit = 0
        trans.Debit = this.Amount
        trans.Mode = 'debit'
      }
      else if(this.mode == 'credit'){
        trans.Credit = this.Amount
        trans.Debit = 0
        trans.Mode = 'credit'
      }
      this.transactionlist.push(trans)
      localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
      if(this.mode == 'debit'){
        this.variable.Debit = this.variable.Debit + this.Amount
      }
      else if(this.mode == 'credit'){
      this.variable.Credit = this.variable.Credit + this.Amount
      }
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

  FilterList(evt) {
    const searchTerm = evt.target.value;
    if (!searchTerm) {
      this.templedgerlist = []
      return;
    }
    if(this.Ledger==''){
      this.templedgerlist = []
    }
    this.templedgerlist = this.ledgerlist.filter(currentGoal => {
      if ((currentGoal.Name && searchTerm) || (currentGoal.Name && searchTerm)) {
        if ((currentGoal.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) || (currentGoal.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      }
    });
  }
  Clear(evt){
    this.templedgerlist = []
  }
  LedgerSelect(value){
    this.templedgerlist = []
    this.Ledger = value
  }
  ngOnInit() {}

}
