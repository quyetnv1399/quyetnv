import { CateActionComponent } from './cateAction/cateAction.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

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
    NzCardModule,
    NzSliderModule,
    NzGridModule,
    NzInputNumberModule,
    NzEmptyModule,
    CategoryRoutes
  ],
  declarations: [CategoryComponent,CateActionComponent]
})
export class CategoryModule { }
