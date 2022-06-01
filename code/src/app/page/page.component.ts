import { environment } from './../../environments/environment';
import { ModalMenuMobileComponent } from './modal-menu-mobile/modal-menu-mobile.component';
import { FormAccountComponent } from './form-account/form-account.component';
import { FormLienHeComponent } from './form-lien-he/form-lien-he.component';

import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {


  size: NzButtonSize = 'large';
  public array = ["Điều hòa LG sốc giảm 20%",
    "Mua điều hòa nhật bãi tặng 1 bình gas",]

  constructor(private modal: NzModalService) { }

  getOfCateData: any[] = [];
  getOfBannerData: any[] = [];

  public urlSub: any;

  public showMenu = true;

  async ngOnInit() {



    // this.changeUrlLogic(location.pathname);
    // this.urlSub = this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     this.changeUrlLogic(val.url);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }

  // changeUrlLogic(url: string) {
  //   if (url.startsWith('/may-lanh/')) {
  //     this.showMenu = false;
  //   }else if(url.startsWith('/danh-muc/')){
  //     this.showMenu = false;
  //   }else if(url.startsWith('/danh-muc')){
  //     this.showMenu = false;
  //   }else if(url.startsWith('/thuong-hieu/')){
  //     this.showMenu = false;
  //   }
  //   else {
  //     this.showMenu = true;
  //   }

  // }

  lienHe(){
    this.modal.create({
      nzTitle: 'Nhập thông tin bên dưới chúng tôi sẽ liên hệ với bạn !!',
      nzContent: FormLienHeComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null
    });
  }

  signIn(){
    this.modal.create({
      nzTitle: 'Tài khoản người dùng',
      nzContent: FormAccountComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null
    });
  }

  modalMenu(){
    this.modal.create({
      nzTitle: 'Menu',
      nzContent: ModalMenuMobileComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: 'auto'
    });
  }
}
