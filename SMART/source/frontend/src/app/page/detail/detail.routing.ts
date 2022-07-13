import { DetailComponent } from './detail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DetailComponent },
];

export const DetailRoutes = RouterModule.forChild(routes);
