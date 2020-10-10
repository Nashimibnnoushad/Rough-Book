import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlybookPage } from './monthlybook.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlybookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlybookPageRoutingModule {}
