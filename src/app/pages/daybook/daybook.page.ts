import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { PopoverController, AlertController } from '@ionic/angular';
import { EditdailybookComponent } from 'src/app/Popover/editdailybook/editdailybook.component';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import { Globalvariables } from 'src/app/models/globalvariables';
import { VariablesService } from 'src/app/variables.service';
@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.page.html',
  styleUrls: ['./daybook.page.scss'],
  providers: [Globalvariables]
})
export class DaybookPage implements OnInit {
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
  totaldebit
  totalcredit
  editindex
  editid
  Language
  msg
  Yes
  No
  transactionlist: Transaction[] = []
  temptransactionlist: Transaction[] = []
  constructor(private popover: PopoverController, private ref: ChangeDetectorRef,private variable:VariablesService,
     public Globalvariable: Globalvariables, public alertController: AlertController,) {
    this.Language = variable.language
    if(this.Language == 'English'){
      this.msg = 'Are you sure to delete?'
      this.Yes = 'Delete'
      this.No = 'Cancel'
    }
    else if(this.Language == 'Malayalam'){
      this.msg = 'ഡിലീറ്റ് ചെയ്യാൻ തയ്യാറാണോ?'
      this.Yes = 'ഡിലീറ്റ്'
      this.No = 'പിൻമാറുക'
      
    }
    localStorage.setItem('Isedittrans','false')
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    let d = new Date()
    this.date = new Date().toISOString();
    let tempdate = this.formatDate(d)
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    this.totalcredit = 0
    this.totaldebit = 0
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date == tempdate)
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
      }
    }
  }
  Getdaybook() {
    let tempdate = this.formatDate(this.date)
    this.totalcredit = 0
    this.totaldebit = 0
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date == tempdate)
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
      }
    }
  }
  Edit(value, index) {
    this.editindex = index
    this.editid = value
    let pop = this.popover.create({ component: EditdailybookComponent, showBackdrop: true, componentProps: { id: value } }).then((popoverElement) => {
      popoverElement.present();
    })
  }
  async Delete(value,index){
    const alert = await this.alertController.create({
      message: this.msg,
      buttons: [
        {
          text: this.No,
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.Yes,
          handler: () => {
            this.DeleteData(value,index);
          }
        }
      ]
    });
    alert.present();
  }
  DeleteData(value,index){
    this.temptransactionlist.splice(index,1)
    this.totalcredit = 0
    this.totaldebit = 0
    for (let i = 0; i < this.temptransactionlist.length; i++) {
      this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
      this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
    }
    for(let i=0;i<this.transactionlist.length;i++){
      if(this.transactionlist[i].Id == value){
        this.transactionlist.splice(i,1)
      }
    }
    localStorage.setItem("Transaction", JSON.stringify(this.transactionlist));
  }
  ListUpdate() {
    let newtransactionlist: Transaction[]=[]
    let updateditem: Transaction[]=[]
    newtransactionlist = JSON.parse(localStorage.getItem("Transaction"))
    updateditem = newtransactionlist.filter(x=>x.Id == this.editid)
    this.temptransactionlist[this.editindex] = updateditem[0]
    this.totalcredit = 0
    this.totaldebit = 0
    for (let i = 0; i < this.temptransactionlist.length; i++) {
      this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
      this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
    }
    localStorage.setItem('Isedittrans','false')
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
  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime)
      this.remainingTime = this.remainingTime / 1000;
      if (this.remainingTime <= 0) {
        let tempvalue = localStorage.getItem('Isedittrans')
        if (tempvalue == 'true') {
          this.ListUpdate()
        }
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
