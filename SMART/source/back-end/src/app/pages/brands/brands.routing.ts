import { BrandsComponent } from './brands.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: BrandsComponent },
];

export const BrandsRoutes = RouterModule.forChild(routes);
