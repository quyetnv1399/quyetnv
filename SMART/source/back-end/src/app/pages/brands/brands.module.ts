import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBrandComponent } from './form-brand/form-brand.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { BrandsRoutes } from './brands.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrandsRoutes,
    NzTableModule,
    NzButtonModule,
    NzIconModule,NzModalModule,
    NzFormModule,NzInputModule,
    NzSwitchModule,NzSelectModule,NzGridModule,
    NzCollapseModule,NzCheckboxModule,NzMessageModule

  ],
  declarations: [BrandsComponent,FormBrandComponent]
})
export class BrandsModule { }
