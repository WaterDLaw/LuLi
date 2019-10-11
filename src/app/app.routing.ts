import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./views/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'measurements',
        loadChildren: () => import('./views/measurements/measurements.module').then(m => m.MeasurementsModule)
      },
      {
        path: 'trainings',
        loadChildren: () => import('./views/trainings/trainings.module').then(m => m.TrainingsModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./views/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./views/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./views/admin/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'pneumologists',
        loadChildren: () => import('./views/pneumologists/pneumologists.module').then(m => m.PneumologistsModule)
      },
      {
        path: 'actionhistory',
        loadChildren: () => import('./views/admin/actionhistory/actionhistory.module').then(m => m.ActionHistoryModule)
      }


      
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
