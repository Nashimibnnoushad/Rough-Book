import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YearlybookPage } from './yearlybook.page';

const routes: Routes = [
  {
    path: '',
    component: YearlybookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YearlybookPageRoutingModule {}
