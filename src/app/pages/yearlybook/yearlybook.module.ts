import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YearlybookPageRoutingModule } from './yearlybook-routing.module';

import { YearlybookPage } from './yearlybook.page';
import { ChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    YearlybookPageRoutingModule
  ],
  declarations: [YearlybookPage]
})
export class YearlybookPageModule {}
