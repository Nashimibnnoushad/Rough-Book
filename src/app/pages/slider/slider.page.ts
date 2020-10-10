import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/variables.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
Name:string = 'Your Name'
Language:string = 'English'
englishshow:boolean = true
    constructor(private router: Router, private variable:VariablesService) { }
    SetLanguage(value){
      if(value == 'English'){
        this.Language = 'English'
      }
      else if(value == 'Malayalam'){
        this.Language = 'Malayalam'
      }
    }
  Continue(){
    let userlist = []
    let user : User = new User() 
    user.Name = this.Name
    user.Language = this.Language
    this.variable.language = this.Language
    userlist.push(user)
    localStorage.setItem("User",JSON.stringify(userlist));
    localStorage.setItem("Slider",JSON.stringify('true'));
    this.variable.menureload = true
    this.router.navigate([''])
    // this.userList = JSON.parse(localStorage.getItem("User"))
  }
  ngOnInit() {
  }

}
