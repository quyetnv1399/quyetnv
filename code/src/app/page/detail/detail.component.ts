import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import { ViewInformationComponent } from './viewInformation/viewInformation.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private modal: NzModalService) { }

  public id:any;
  demoValue = 1;

  findProduct:any;
  getFindOProductId: any;
  getFindOIProductId: any;
  listOfDataBrand: any[] = [];

  ngOnInit() {

  }

  viewAbout(){
    this.modal.create({
      nzTitle: 'Thông tin sản phẩm',
      nzContent: ViewInformationComponent,
      nzMaskClosable: false,
      nzWidth: 1140,
      nzComponentParams: {
        id: this.id,
        mode: 'view',
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 500))
    });
  }
}
