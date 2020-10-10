import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Transaction } from 'src/app/models/transaction';
import { Globalvariables } from 'src/app/models/globalvariables';
import { VariablesService } from 'src/app/variables.service';

@Component({
  selector: 'app-editdailybook',
  templateUrl: './editdailybook.component.html',
  styleUrls: ['./editdailybook.component.scss'],
  providers: [Globalvariables]

})
export class EditdailybookComponent implements OnInit {
transid
date
Ledger
Comment
Amount
Ledgerid
Language
transactionlist:Transaction[]=[]
  constructor(private popover:PopoverController, public navParams:NavParams, private variable:VariablesService,
     public globalvariable:Globalvariables) {
    this.Language = variable.language
    this.transid = this.navParams.get('id');
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    if(this.transactionlist!=null){
      let tempvalue: Transaction[]=[]
      tempvalue = this.transactionlist.filter(x=>x.Id == this.transid)
      let tempdate = tempvalue[0].Date.slice(0,2)
      let tempmonth = tempvalue[0].Date.slice(3,5)
      let tempyear = tempvalue[0].Date.slice(6)
      let newdate = tempmonth
      let newmonth = tempdate
      this.date = newdate + '-' + newmonth + '-' + tempyear
      this.Ledger = tempvalue[0].Ledgername
      this.Comment = tempvalue[0].Comment
      this.Ledgerid = tempvalue[0].Ledgerid
      if(tempvalue[0].Mode=='debit'){
        this.Amount = tempvalue[0].Debit
      }
      else if(tempvalue[0].Mode == 'credit'){
        this.Amount = tempvalue[0].Credit
      }
    }
   }
   Update(){
     for(let i=0;i<this.transactionlist.length;i++){
       if(this.transactionlist[i].Id == this.transid){
         this.transactionlist[i].Date = this.formatDate(this.date)
         this.transactionlist[i].Comment = this.Comment
         if(this.transactionlist[i].Ledgerid != 'Not a ledger'){
           this.transactionlist[i].Ledgername = this.Ledger
         }
         if(this.transactionlist[i].Mode == 'debit'){
           this.transactionlist[i].Debit = this.Amount
         }
         else if(this.transactionlist[i].Mode == 'credit'){
           this.transactionlist[i].Credit = this.Amount
         }
       }
     }
     localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
     localStorage.setItem('Isedittrans','true')
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
  Cancel(){
    this.ClosePopOver()
  }
  ClosePopOver() {
    this.popover.dismiss();
  }
  ngOnInit() {}

}
