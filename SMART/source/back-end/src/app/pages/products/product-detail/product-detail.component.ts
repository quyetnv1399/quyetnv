import { FormAtrComponent } from './form-atr/form-atr.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() id: number | null = null;
  @Input() mode!: string;
  @Output() onClose = new EventEmitter<any>();
  constructor(
    private modal: NzModalService,
    private http: HttpClient
  ) { }

  product: any;
  category: any;
  brand: any;
  dateSaleProduct: any;

  ngOnInit() {
    this.finOneProduct();
  }

  async finOneProduct(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/FindOne?id=${this.id}`));
    this.product = x;
    let y:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/FindOne?id=${x.categorY_ID}`));
    this.category = y;
    let z:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/FindOne?id=${x.branD_ID}`));
    this.brand = z;
    let d:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductSale/FindOne?id=${x.id}`));
    if(d){
      this.dateSaleProduct = d;
    }else{
      this.dateSaleProduct
    }
  }



  addAtr(){
    let dialog = this.modal.create({
      nzTitle: 'Thêm thuộc tính',
      nzContent: FormAtrComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzWidth: 1000,
      nzFooter: null,
      nzAutofocus: null
    });
  }
}
