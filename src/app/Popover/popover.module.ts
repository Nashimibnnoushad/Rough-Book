import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PopoverModule { }
