import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { VariablesService } from 'src/app/variables.service';
import { Globalvariables } from 'src/app/models/globalvariables';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
  Name
  user: User[]=[]
  Language
  variable: Globalvariables = new Globalvariables()
  languagelist = [{"Name": "English", "value": "English"},{"Name": "Malayalam", "value": "Malayalam"}]
  constructor(private popover: PopoverController, private variableservice:VariablesService) { 
    this.Language = variableservice.language
    this.user = JSON.parse(localStorage.getItem("User"))
    this.Name = this.user[0].Name
  }
  ClosePopOver() {
    this.popover.dismiss();
  }
  Cancel(){
    this.ClosePopOver()
  }
  Update(){
    let userlist = []
    let user : User = new User() 
    user.Name = this.Name
    user.Language = this.Language
    this.variableservice.language = this.Language
    userlist.push(user)
    localStorage.setItem("User",JSON.stringify(userlist));
    this.variableservice.menureload = true
    this.variableservice.profilereload = true
    this.ClosePopOver()
  }
  ngOnInit() {}

}
