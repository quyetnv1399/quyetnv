import { ViewInformationComponent } from './viewInformation/viewInformation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutes } from './detail.routing';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
    NzCarouselModule,
    NzButtonModule,
    FormsModule,
    NzInputNumberModule,
    NzModalModule,
    DetailRoutes
  ],
  declarations: [DetailComponent,ViewInformationComponent]
})
export class DetailModule { }
