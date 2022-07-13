import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: DashboardComponent },
];

export const DashboardRoutes = RouterModule.forChild(routes);
