import { DashboardRoutes } from './dashboard.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutes
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
