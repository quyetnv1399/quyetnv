import { FormBrandComponent } from './form-brand/form-brand.component';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

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
    this.getBrand()
  }

  async getBrand(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/GetBrand`))
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.listOfData = x
  }

  onAdd(){
    let dialog = this.modal.create({
      nzTitle: 'Th??m th????ng hi???u',
      nzContent: FormBrandComponent,
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
        this.getBrand();
      }
    })
  }

  onEdit(id: number){
    let dialog = this.modal.create({
      nzTitle: 'Th??ng tin th????ng hi???u',
      nzContent: FormBrandComponent,
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
        this.getBrand();
      }
    })
  }

  async remove(id: number) {
    this.modal.confirm({
      nzTitle: 'B???n mu???n x??a th????ng hi???u n??y?',
      nzContent: '???n n??t OK ????? x??a, sau khi x??a s??? ????ng c???a s??? trong 1 gi??y',
      nzOnOk: () =>
        new Promise(async (resolve, reject) => {
          await firstValueFrom(this.http.delete(`${environment.api}/api/Brand/Remove?id=${id}`));
          this.message.success('X??a th??nh c??ng!!')
          this.getBrand();
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }



}
