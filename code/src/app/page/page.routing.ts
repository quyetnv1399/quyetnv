import { PageComponent } from './page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: PageComponent },
];

export const PageRoutes = RouterModule.forChild(routes);
