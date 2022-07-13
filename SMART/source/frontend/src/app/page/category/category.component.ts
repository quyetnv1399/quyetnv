import { CateActionComponent } from './cateAction/cateAction.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private modal: NzModalService) { }
  type = "caret-up";
  // type2 = "caret-up";
  size: NzButtonSize = 'large';
  public brandId: number = 0;
  listProduct: any[] = [];
  getOfBrandData: any[] = [];
  getOfOption1Data: any[] = [];
  getOfOption2Data: any[] = [];
  getOfOption3Data: any[] = [];
  getOfProductOfListData: any[] = [];
  public IdLinkRoute: any | null = null;
  public countProduct: number = 0;


  controlAction: any[] = [
    {
      id: 0,
      name: "Hãng"
    },
    {
      id: 1,
      name: "Giá"
    },
    {
      id: 2,
      name: "Công nghệ Inverter"
    },
    {
      id: 3,
      name: "Loại"
    }
  ];
  priceAction: any [] = [
    {
      value: 1,
      name: "Dưới 7 Triệu"
    },
    {
      value: 2,
      name: "Từ 7 - 9 Triệu"
    },
    {
      value: 3,
      name: "Từ 9 - 12 Triệu"
    },
    {
      value: 4,
      name: "Từ 12 - 15 Triệu"
    },
    {
      value: 5,
      name: "Trên 20 Triệu"
    },
  ]



  async ngOnInit() {
    if (this.route.snapshot.paramMap.get('cateId')) {
      this.IdLinkRoute = this.route.snapshot.paramMap.get('cateId');
    }
    if (this.route.snapshot.paramMap.get('brandId')) {
      this.IdLinkRoute = this.route.snapshot.paramMap.get('brandId');
    }


    this.getBrand();

    if (this.IdLinkRoute && this.route.snapshot.paramMap.get('brandId')) {
      await this.getProductOnLinkRouteBrand(this.IdLinkRoute);
    } else if (this.IdLinkRoute && this.route.snapshot.paramMap.get('cateId')) {
      await this.getProductOnLinkRouteCate(this.IdLinkRoute);
    }
    else {
      await this.getProductOfBrand(this.brandId);
    }

    this.getOption1();
    this.getOption2();
    this.getOption3();
  }

  getProduct() {
    this.http.get(`${environment.api}/api/Product/GetProduct`).subscribe((x: any) => {
      this.listProduct = x;
    })
  }

  getBrand() {
    this.http.get(`${environment.api}/api/Brand/GetBrand`).subscribe((x: any) => {
      for (const item of x) {
        item.image = `${environment.api}/${item.image}`
      }
      this.getOfBrandData = x;
    })
  }

  getOption1() {
    this.http.get(`${environment.api}/api/ProductOption/GetOption`).subscribe((x: any) => {
      this.getOfOption1Data = x;
    })
  }
  getOption2() {
    this.http.get(`${environment.api}/api/ProductOption2/GetOption2`).subscribe((x: any) => {
      this.getOfOption2Data = x;
    })
  }
  getOption3() {
    this.http.get(`${environment.api}/api/ProductOption3/GetOption3`).subscribe((x: any) => {
      this.getOfOption3Data = x;
    })
  }

  async getProductOfBrand(brandId: number) {
    this.brandId = brandId
    if (this.brandId === 0) {
      let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProduct`));
      for (const item of x) {
        item.image = `${environment.api}/${item.image}`
      }
      this.getOfProductOfListData = x;
      this.countProduct = x.length;
    } else {
      let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProductOfBrand?id=${brandId}`));
      for (const item of x) {
        item.image = `${environment.api}/${item.image}`
      }
      this.getOfProductOfListData = x;
      this.countProduct = x.length;
    }
  }

  async getProductOnLinkRouteBrand(brandId: number) {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProductOfBrand?id=${brandId}`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.getOfProductOfListData = x;
    this.countProduct = x.length;
  }

  async getProductOnLinkRouteCate(cateId: number) {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProductOfCate?id=${cateId}`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.getOfProductOfListData = x;
    this.countProduct = x.length;
  }

  onFilterModal(){

  }

  btnAction(id:any){
    let name = ""
    if(id === 0){
      name = "Hãng";
    }else if(id === 1){
      name = "Giá";
    }else if(id === 2){
      name = "Công nghệ Inverter";
    }else if(id === 3){
      name = "Loại";
    }
    this.modal.create({
      nzTitle: name,
      nzContent: CateActionComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzComponentParams: {
        id: id
      },
      nzFooter: null,
      nzWidth: "auto"
    });
  }


}
