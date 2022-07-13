import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: "dashboard", loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: "brand", loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule) },
  { path: "product", loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },
  { path: "category", loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule) },
  { path: "user", loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) },
  { path: "order", loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule) },


];

export const AppRoutes = RouterModule.forRoot(routes);
