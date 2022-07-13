import { CartComponent } from './cart/cart.component';
import { environment } from './../../environments/environment';
import { ModalMenuMobileComponent } from './modal-menu-mobile/modal-menu-mobile.component';
import { FormAccountComponent } from './form-account/form-account.component';
import { FormLienHeComponent } from './form-lien-he/form-lien-he.component';

import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  title = 'Điện thoại giá tốt tại SmartMask';

  size: NzButtonSize = 'large';
  public array = ["Điều hòa LG sốc giảm 20%",
    "Mua điều hòa nhật bãi tặng 1 bình gas",]

  constructor(
    private http: HttpClient,
    private router: Router,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private metaTagService: Meta,
    private titleService: Title,
    ) { }

  getOfCateData: any[] = [];
  getOfBannerData: any[] = [];
  getSubCate: any
  public urlSub: any;

  public showMenu: boolean = true;
  public showOther: boolean = true;

  getCateParent = [...this.getOfCateData]
  getCategory = [...this.getOfCateData]




  async ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaTagService.addTags([
      { name: 'keywords', content: 'Kho điều hòa, bán hàng tại kho, điều hòa giá rẻ, điều hòa giá rẻ uy tín, điện lạnh dân dụng, vua điều hòa, điện lạnh, máy lạnh, điều hòa, điện máy' },
      // { name: 'description', content: 'Kho điều hòa - mua sắm các thiết bị điện lạnh tại kho. Xem sản phẩm online tại khodieuhoa24h.com giá tốt phục vụ chuyên nghiệp tận tâm' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { property: 'og:type', content: 'https://goo.gl/maps/8SRGJH3gj6s5koMy7' },
      // { property: 'og:title', content: 'Điều hòa THÀNH PHÁT - KHO điều hòa giá tốt tại Hà Nội, chuyên mua bán các loại điều hòa, sửa chữa và bảo hành' },
      // { property: 'og:image', content: 'https://evn6.vn/wp-content/uploads/2020/12/tong-kho-dieu-hoa-casper-tai-nam-tu-liem.jpg' },

      { charset: 'UTF-8' }
    ]);

    this.getBanner();
    await this.getMenu();
    this.getParent();


    this.changeUrlLogic(location.pathname);
    this.urlSub = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.changeUrlLogic(val.url);
      }
    });

  }

  ngOnDestroy(): void {
    this.urlSub.unsubscribe();
  }

  changeUrlLogic(url: string) {
    if (url.startsWith('/dien-thoai/')) {
      this.showMenu = false;
      this.showOther = false;
    }else if(url.startsWith('/danh-muc/')){
      this.showMenu = false;
      this.showOther = false;
    }else if(url.startsWith('/cart')){
      this.showMenu = false;
      this.showOther = false;
    }else if(url.startsWith('/danh-muc')){
      this.showMenu = false;
      this.showOther = false;
    }else if(url.startsWith('/thuong-hieu/')){
      this.showMenu = false;
      this.showOther = false;
    }else if(url.startsWith('/')){
      this.showMenu = false;
    }
    else {
      this.showMenu = true;
    }

  }

  showCart(){
    this.modal.create({
      nzTitle: '<i nz-icon nzType="shopping-cart" nzTheme="outline"></i> Giỏ hàng',
      nzContent: CartComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: 'auto'
    });
  }

  async getMenu() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetCategory`))
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`;

    }
    this.getOfCateData = x;
  }

  getParent(){
    this.getCateParent = this.getOfCateData.filter(item => item.parenT_ID === 0)
    this.getCategory = this.getOfCateData.filter(item => item.parenT_ID !== 0)
    console.log(this.getCategory);
  }

  async getBanner(){
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Banner/GetBannerActive`))
    for (const item of x) {
      item.name = `${environment.api}/${item.name}`;
    }
    this.getOfBannerData = x;
  }

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
