import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { VariablesService } from 'src/app/variables.service';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 0.01;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  pages=[]
  englishpages = [
    {
      title:'Home',
      url:'/menu/home',
      icon:'home'
    },
    {
      title:'Ledger',
      url:'/menu/ledger',
      icon:'people-circle-outline'
    },   
    {
      title:'Day Book',
      url:'/menu/daybook',
      icon:'newspaper-outline'
    },
    {
      title:'Monthly Book',
      url:'/menu/monthlybook',
      icon:'newspaper-outline'
    },
    {
      title:'Yearly Book',
      url:'/menu/yearlybook',
      icon:'newspaper-outline'
    },
    {
      title:'Profile',
      url:'/menu/profile',
      icon:'person-outline'
    },
    {
      title:'Devloper',
      url:'/menu/developer',
      icon:'code-working-outline'
    },
  ]
  malayalampages = [
    {
      title:'ഹോം',
      url:'/menu/home',
      icon:'home'
    },
    {
      title:'ആളുകൾ',
      url:'/menu/ledger',
      icon:'people-circle-outline'
    },   
    {
      title:'ദിവസ കണക്ക്',
      url:'/menu/daybook',
      icon:'newspaper-outline'
    },
    {
      title:'മാസ കണക്ക്',
      url:'/menu/monthlybook',
      icon:'newspaper-outline'
    },
    {
      title:'വർഷ കണക്ക്',
      url:'/menu/yearlybook',
      icon:'newspaper-outline'
    },
    {
      title:'പ്രൊഫൈൽ',
      url:'/menu/profile',
      icon:'person-outline'
    },
    {
      title:'ഡവലപ്പർ',
      url:'/menu/developer',
      icon:'code-working-outline'
    },
  ]
 user: User[]=[]
 Name
 Language
  constructor(private variable:VariablesService, private ref: ChangeDetectorRef) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.user = JSON.parse(localStorage.getItem("User"))
    this.Name = this.user[0].Name
    console.log(this.user[0].Language)
    this.variable.language = this.user[0].Language
    this.Language = variable.language
    if(this.Language == 'English'){
      this.pages = this.englishpages
    }
    else if(this.Language == 'Malayalam'){
      this.pages = this.malayalampages
    }
   }
Refresh(){
  this.user = JSON.parse(localStorage.getItem("User"))
  this.Name = this.user[0].Name
  console.log(this.user[0].Language)
  this.variable.language = this.user[0].Language
  this.Language = this.variable.language
  if(this.Language == 'English'){
    this.pages = this.englishpages
  }
  else if(this.Language == 'Malayalam'){
    this.pages = this.malayalampages
  }
  this.variable.menureload = false
}
  ngOnInit() {
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime)
      this.remainingTime = this.remainingTime / 1000;
      if (this.remainingTime <= 0) {
        if(this.variable.menureload == true){
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
