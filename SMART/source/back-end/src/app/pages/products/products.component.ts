import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormProductComponent } from './form-product/form-product.component';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private modal: NzModalService,
    private http: HttpClient,
    private message: NzMessageService
    ) { }

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }













  listOfDataCate: any[] = []

  size: NzButtonSize = 'default';
  boxChecked = true;
  checkIndex: number = 0;

  ngOnInit() {
    this.getProduct();
    this.getCategory();
  }

  async getProduct(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProduct`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.listOfData = x
  }

  async getCategory(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetCategory`))
    this.listOfDataCate = x
  }

  onAdd(){
    let dialog = this.modal.create({
      nzTitle: 'Thêm mới sản phẩm',
      nzContent: FormProductComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 1000,
      nzFooter: null,
      nzComponentParams: {
        mode: "add"
      },
      nzAutofocus: null
    });
    dialog.componentInstance?.onClose.subscribe(c => {
      if(c){
        dialog.close();
        this.getProduct();
      }
    })
  }
  onEdit(id: number){
    let dialog = this.modal.create({
      nzTitle: 'Thông tin sản phẩm',
      nzContent: FormProductComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 1000,
      nzFooter: null,
      nzComponentParams: {
        id: id,
        mode: "edit"
      },
      nzAutofocus: null
    });
    dialog.componentInstance?.onClose.subscribe(c => {
      if(c){
        dialog.close();
        this.getProduct();
      }
    })
  }

  onEventDetail(id:number){
    let dialog = this.modal.create({
      nzTitle: 'Chi tiết sản phẩm',
      nzContent: ProductDetailComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 1200,
      nzFooter: null,
      nzComponentParams: {
        id: id,
        mode: "viewDetail"
      },
      nzAutofocus: null
    });
  }

  remove(id: number) {
    this.modal.confirm({
      nzTitle: 'Bạn muốn xóa sản phẩm này?',
      nzContent: 'Ấn nút OK để xóa, sau khi xóa sẽ đóng cửa sổ trong 1 giây',
      nzOnOk: () =>
        new Promise(async (resolve, reject) => {
          await firstValueFrom(this.http.delete(`${environment.api}/api/ProductSale/Remove?id=${id}`));
          await firstValueFrom(this.http.delete(`${environment.api}/api/Product/Remove?id=${id}`));
          this.message.success('Xóa thành công!!')
          this.getProduct();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}
