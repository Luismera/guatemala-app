import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'page',
    component: PagesPage,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./promotions/promotions.module').then( m => m.PromotionsPageModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  { 
    path: '**', redirectTo: 'page/dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
