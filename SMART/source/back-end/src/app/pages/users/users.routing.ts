import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:"", component: UsersComponent },
];

export const UsersRoutes = RouterModule.forChild(routes);
