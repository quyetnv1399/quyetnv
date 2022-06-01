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

  constructor(private modal: NzModalService) { }
  type = "caret-up";
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
  ]



  async ngOnInit() {

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
