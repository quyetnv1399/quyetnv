import { DefaultError404Component } from './default-error404/default-error404.component';
import { PageComponent } from './page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: PageComponent, children: [
    { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'may-lanh/:id', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule) },
    { path: 'danh-muc', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
    { path: 'danh-muc/:cateId', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
    { path: 'thuong-hieu/:brandId', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  ]},
  { path: '**', component: DefaultError404Component}
];

export const PageRoutes = RouterModule.forChild(routes);
