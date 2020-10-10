import { Component, OnInit } from '@angular/core';
import { VariablesService } from 'src/app/variables.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.page.html',
  styleUrls: ['./developer.page.scss'],
})
export class DeveloperPage implements OnInit {
Language
  constructor(private variable:VariablesService) {
    this.Language = variable.language
   }

  ngOnInit() {
  }

}
