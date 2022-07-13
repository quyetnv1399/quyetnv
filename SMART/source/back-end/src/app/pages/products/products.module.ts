import { FormAtrComponent } from './product-detail/form-atr/form-atr.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormProductComponent } from './form-product/form-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutes } from './products.routing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutes,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,NzModalModule,
    NzFormModule,NzInputModule,
    NzUploadModule,NzSwitchModule,NzSelectModule,NzGridModule,
    NzCollapseModule,NzCheckboxModule,NzMessageModule
  ],
  declarations: [ProductsComponent,FormProductComponent,ProductDetailComponent,FormAtrComponent]
})
export class ProductsModule { }
