import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
    path: 'home',
    loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'ledger',
    loadChildren: () => import('../ledger/ledger.module').then( m => m.LedgerPageModule)
  },
  {
    path: 'daybook',
    loadChildren: () => import('../daybook/daybook.module').then( m => m.DaybookPageModule)
  },
  {
    path: 'monthlybook',
    loadChildren: () => import('../monthlybook/monthlybook.module').then( m => m.MonthlybookPageModule)
  },
  {
    path: 'yearlybook',
    loadChildren: () => import('../yearlybook/yearlybook.module').then( m => m.YearlybookPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'developer',
    loadChildren: () => import('../developer/developer.module').then( m => m.DeveloperPageModule)
  },
    ]
  }
  
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
