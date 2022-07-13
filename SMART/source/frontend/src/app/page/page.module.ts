import { CartComponent } from './cart/cart.component';
import { ModalMenuMobileComponent } from './modal-menu-mobile/modal-menu-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormAccountComponent } from './form-account/form-account.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRoutes } from './page.routing';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormLienHeComponent } from './form-lien-he/form-lien-he.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
    NzCarouselModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
    FormsModule,
    NzInputNumberModule,NzCheckboxModule,ReactiveFormsModule,
    PageRoutes
  ],
  declarations: [PageComponent,FormLienHeComponent,FormAccountComponent,ModalMenuMobileComponent,CartComponent]
})
export class PageModule { }
