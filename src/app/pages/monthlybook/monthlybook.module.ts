import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthlybookPageRoutingModule } from './monthlybook-routing.module';

import { MonthlybookPage } from './monthlybook.page';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    MonthlybookPageRoutingModule
  ],
  declarations: [MonthlybookPage]
})
export class MonthlybookPageModule {}
