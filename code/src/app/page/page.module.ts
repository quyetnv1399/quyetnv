import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutes } from './page.routing';

@NgModule({
  imports: [
    CommonModule,
    PageRoutes
  ],
  declarations: [PageComponent]
})
export class PageModule { }
