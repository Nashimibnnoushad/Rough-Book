import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { VariablesService } from './variables.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit{
  backButtonSubscription; 
  Language
  msg
  Yes
  No
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public alertController: AlertController,
    private variable:VariablesService,
  ) {
    var Slidershow
    Slidershow = localStorage.getItem('Slider')
    console.log( Slidershow)
    if(Slidershow == null || Slidershow == undefined){
      this.router.navigate(['/slider'])
    }
    else if(Slidershow != null || Slidershow != undefined){
      this.router.navigate([''])
    }
    this.initializeApp();
  }
  ngOnInit() { }
  ngAfterViewInit() {
    this.Language = this.variable.language
    if(this.Language == undefined){
      this.Language = 'English'
    }
    if(this.Language == 'English'){
      this.msg = 'Are you sure to exit the app?'
      this.Yes = 'Exit'
      this.No = 'Cancel'
    }
    else if(this.Language == 'Malayalam'){
      this.msg = 'ആപ്പിൽ നിന്നു പുറത്തുകടക്കാൻ തയ്യാറാണോ?'
      this.Yes = 'പിൻമാറുക'
      this.No = 'അതെ'
    }
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
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
              navigator['app'].exitApp();
            }
          }
        ]
      });
      alert.present();
      
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
