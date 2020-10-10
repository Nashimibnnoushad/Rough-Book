import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider.module').then( m => m.SliderPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'ledger',
  //   loadChildren: () => import('./pages/ledger/ledger.module').then( m => m.LedgerPageModule)
  // },
  // {
  //   path: 'daybook',
  //   loadChildren: () => import('./pages/daybook/daybook.module').then( m => m.DaybookPageModule)
  // },
  // {
  //   path: 'monthlybook',
  //   loadChildren: () => import('./pages/monthlybook/monthlybook.module').then( m => m.MonthlybookPageModule)
  // },
  // {
  //   path: 'yearlybook',
  //   loadChildren: () => import('./pages/yearlybook/yearlybook.module').then( m => m.YearlybookPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  // },
  // {
  //   path: 'developer',
  //   loadChildren: () => import('./pages/developer/developer.module').then( m => m.DeveloperPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
