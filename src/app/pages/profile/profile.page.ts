import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Transaction } from 'src/app/models/transaction';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/variables.service';
import { EditprofileComponent } from 'src/app/Popover/editprofile/editprofile.component';
import { Observable, timer, Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 0.01;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  Name
  user: User[]=[]
  transactionlist: Transaction[] = []
  totaldebit = 0
  totalcredit = 0
  balance = 0
  Language
  msg
  Yes
  No
  editmode:boolean = false
  languagelist = [{"Name": "English", "value": "English"},{"Name": "Malayalam", "value": "Malayalam"}]
  constructor(public alertController: AlertController, private router: Router,
     private popover: PopoverController,  private ref: ChangeDetectorRef,
     private variable:VariablesService) { 
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.Language = variable.language
    if(this.Language == 'English'){
      this.msg = 'Are you sure to reset all data?'
      this.Yes = 'Yes'
      this.No = 'No'
    }
    else if(this.Language == 'Malayalam'){
      this.msg = 'എല്ലാ വിവരങ്ങളും പുനക്രമീകരിക്കാൻ തയ്യാറാണോ?'
      this.Yes = 'അതെ'
      this.No = 'അല്ല'
    }
    this.user = JSON.parse(localStorage.getItem("User"))
    this.Name = this.user[0].Name
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    if(this.transactionlist != null){
      this.totalcredit = 0
      this.totaldebit = 0
      this.balance = 0
      for (let i = 0; i < this.transactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.transactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.transactionlist[i].Credit
        if(this.totaldebit>=this.totalcredit){
          this.balance = this.totaldebit - this.totalcredit
        }
        else if(this.totalcredit>this.totaldebit){
          this.balance = this.totalcredit - this.totaldebit
        }
      }
    }
  }
  async Reset(){
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
            this.ResetData();
          }
        }
      ]
    });
    alert.present();
  }
  ResetData(){
    localStorage.clear();
    this.router.navigate(['/slider'])
  }
  Edit(){
    // this.editmode = true
    this.popover.create({ component: EditprofileComponent, showBackdrop: true }).then((popoverElement) => {
      popoverElement.present();
    })
  }
  Update(){
    let userlist = []
    let user : User = new User() 
    user.Name = this.Name
    user.Language = this.Language
    console.log(this.Language)
    this.variable.language = this.Language
    userlist.push(user)
    localStorage.setItem("User",JSON.stringify(userlist));
    this.variable.menureload = true
    this.editmode = false
    if(this.Language == 'English'){
      this.msg = 'Are you sure to reset all data?'
      this.Yes = 'Yes'
      this.No = 'No'
    }
    else if(this.Language == 'Malayalam'){
      this.msg = 'എല്ലാ വിവരങ്ങളും പുനക്രമീകരിക്കാൻ തയ്യാറാണോ?'
      this.Yes = 'അതെ'
      this.No = 'അല്ല'
    }
  }
  Refresh(){
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.Language = this.variable.language
    if(this.Language == 'English'){
      this.msg = 'Are you sure to reset all data?'
      this.Yes = 'Yes'
      this.No = 'No'
    }
    else if(this.Language == 'Malayalam'){
      this.msg = 'എല്ലാ വിവരങ്ങളും പുനക്രമീകരിക്കാൻ തയ്യാറാണോ?'
      this.Yes = 'അതെ'
      this.No = 'അല്ല'
    }
    this.user = JSON.parse(localStorage.getItem("User"))
    this.Name = this.user[0].Name
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    if(this.transactionlist != null){
      this.totalcredit = 0
      this.totaldebit = 0
      this.balance = 0
      for (let i = 0; i < this.transactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.transactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.transactionlist[i].Credit
        if(this.totaldebit>=this.totalcredit){
          this.balance = this.totaldebit - this.totalcredit
        }
        else if(this.totalcredit>this.totaldebit){
          this.balance = this.totalcredit - this.totaldebit
        }
      }
    }
    this.variable.profilereload = false
  }
    ngOnInit() {
      this.subscription = this.everySecond.subscribe((seconds) => {
        var currentTime: moment.Moment = moment();
        this.remainingTime = this.searchEndDate.diff(currentTime)
        this.remainingTime = this.remainingTime / 1000;
        if (this.remainingTime <= 0) {
          if(this.variable.profilereload == true){
            this.Refresh()
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
