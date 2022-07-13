import { CategoriesComponent } from './categories.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: CategoriesComponent },
];

export const CategoriesRoutes = RouterModule.forChild(routes);
