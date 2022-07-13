import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: ProductsComponent },
];

export const ProductsRoutes = RouterModule.forChild(routes);
