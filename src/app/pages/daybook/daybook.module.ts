import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaybookPageRoutingModule } from './daybook-routing.module';

import { DaybookPage } from './daybook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaybookPageRoutingModule
  ],
  declarations: [DaybookPage]
})
export class DaybookPageModule {}
