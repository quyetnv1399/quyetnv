import { CategoryComponent } from './category.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CategoryComponent  },
];

export const CategoryRoutes = RouterModule.forChild(routes);
