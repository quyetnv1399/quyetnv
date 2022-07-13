import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormCategoryComponent } from './form-category/form-category.component';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { environment } from 'src/environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

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
  listOfData:  any[] = [];
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

  onCurrentPageDataChange($event:  any): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


  size: NzButtonSize = 'default';

  ngOnInit() {
    this.getCategory()
  }

  async getCategory(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetCategory`))
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.listOfData = x
  }

  onAdd(){
    let dialog = this.modal.create({
      nzTitle: 'Thêm danh mục',
      nzContent: FormCategoryComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 980,
      nzFooter: null,
      nzComponentParams: {
        mode: "add"
      }
    });

     dialog.componentInstance?.onClose.subscribe( x => {
      if(x){
        dialog.close();
        this.getCategory();
      }
    })
  }

  onEdit(id: number){
    let dialog = this.modal.create({
      nzTitle: 'Thông tin danh mục',
      nzContent: FormCategoryComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 980,
      nzFooter: null,
      nzComponentParams: {
        id: id,
        mode: "edit"
      }
    });

    dialog.componentInstance?.onClose.subscribe( x => {
      if(x){
        dialog.close();
        this.getCategory();
      }
    })
  }

  async remove(id: number) {
    this.modal.confirm({
      nzTitle: 'Bạn muốn xóa sản phẩm này?',
      nzContent: 'Ấn nút OK để xóa, sau khi xóa sẽ đóng cửa sổ trong 1 giây',
      nzOnOk: () =>
        new Promise(async (resolve, reject) => {
          await firstValueFrom(this.http.delete(`${environment.api}/api/Category/Remove?id=${id}`));
          this.message.success('Xóa thành công!!')
          this.getCategory();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

}
