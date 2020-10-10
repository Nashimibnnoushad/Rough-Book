import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { PopoverController, AlertController } from '@ionic/angular';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';
import * as HighCharts from 'highcharts';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { VariablesService } from 'src/app/variables.service';
@Component({
  selector: 'app-monthlybook',
  templateUrl: './monthlybook.page.html',
  styleUrls: ['./monthlybook.page.scss'],
})
export class MonthlybookPage implements OnInit {
  @ViewChild("doughnutCanvas", {static: true}) doughnutCanvas: ElementRef;
  private doughnutChart: Chart;
  date
  totaldebit
  totalcredit
  editindex
  editid
  creditpercentage
  debitpercentage 
  Language
  transactionlist: Transaction[] = []
  temptransactionlist: Transaction[] = []
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  doughnutChartLabels: Label[] = ['Debit', 'Credit'];
 english = ['Debit', 'Credit']
 malayalam = ['വരവ്', 'ചിലവ്']
  doughnutChartData: MultiDataSet = [
    []
  ];

  doughnutChartType: ChartType = 'doughnut';

  colors: Color[] = [
    {
      backgroundColor: [
        'green',
        'red'
      ]
    }
  ];
  constructor(private popover: PopoverController, private ref: ChangeDetectorRef, private variable:VariablesService,
    public alertController: AlertController,) {
    this.Language = variable.language
    if(this.Language == 'English'){
      this.doughnutChartLabels = this.english
    }
    else if(this.Language == 'Malayalam'){
      this.doughnutChartLabels = this.malayalam
    }
    localStorage.setItem('Isedittrans','false')
    let d = new Date()
    this.date = new Date().toISOString();
    let tempdate = this.formatDate(d)
    this.transactionlist = JSON.parse(localStorage.getItem("Transaction"))
    this.totalcredit = 0
    this.totaldebit = 0
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == tempdate.slice(3))
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
      }
      this.debitpercentage = ((this.totaldebit)/(this.totaldebit+this.totalcredit)) * 100
      this.creditpercentage = ((this.totalcredit)/(this.totaldebit+this.totalcredit)) * 100
      this.doughnutChartData = [this.debitpercentage.toFixed() , this.creditpercentage.toFixed()]
    }
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  GetMonthlybook(){
    let tempdate = this.formatDate(this.date)
    this.totalcredit = 0
    this.totaldebit = 0
    if (this.transactionlist != null) {
      this.temptransactionlist = this.transactionlist.filter(x => x.Date.slice(3) == tempdate.slice(3))
      for (let i = 0; i < this.temptransactionlist.length; i++) {
        this.totaldebit = this.totaldebit + this.temptransactionlist[i].Debit
        this.totalcredit = this.totalcredit + this.temptransactionlist[i].Credit
      }
      this.debitpercentage = ((this.totaldebit)/(this.totaldebit+this.totalcredit)) * 100
      this.creditpercentage = ((this.totalcredit)/(this.totaldebit+this.totalcredit)) * 100
      this.doughnutChartData = [this.debitpercentage.toFixed() , this.creditpercentage.toFixed()]
    }
  }
  ngAfterViewInit() {

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
  ngOnInit() {}

}
