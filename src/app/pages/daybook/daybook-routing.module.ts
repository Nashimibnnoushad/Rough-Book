import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaybookPage } from './daybook.page';

const routes: Routes = [
  {
    path: '',
    component: DaybookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaybookPageRoutingModule {}
