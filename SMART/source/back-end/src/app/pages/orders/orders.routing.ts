import { OrdersComponent } from './orders.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "", component: OrdersComponent },
];

export const OrdersRoutes = RouterModule.forChild(routes);
