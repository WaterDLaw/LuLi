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
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'login',
        loadChildren: './views/login/login.module#LoginModule'
      },
      {
        path: 'clients',
        loadChildren: './views/clients/clients.module#ClientsModule'
      },
      {
        path: 'measurements',
        loadChildren: './views/measurements/measurements.module#MeasurementsModule'
      },
      {
        path: 'trainings',
        loadChildren: './views/trainings/trainings.module#TrainingsModule'
      },
      {
        path: 'reports',
        loadChildren: './views/reports/reports.module#ReportsModule'
      },
      {
        path: 'statistics',
        loadChildren: './views/statistics/statistics.module#StatisticsModule'
      },
      {
        path: 'admin',
        loadChildren: './views/admin/users/users.module#UsersModule'
      }

      
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
