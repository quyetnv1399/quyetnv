import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartComponent } from '../cart/cart.component';
import { ViewInformationComponent } from './viewInformation/viewInformation.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private modal: NzModalService) { }

  public id:any;
  demoValue = 1;

  findProduct:any;
  getFindOProductId: any;
  getFindOIProductId: any;
  listOfDataBrand: any[] = [];

  cart:any[] = []


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')

    this.findOneData();
    this.getProductIn4();
    this.getProductIparam();
    this.getBrand();
  }

  findOneData(){
    this.http.get(`${environment.api}/api/Product/FindOne?id=${this.id}`).subscribe((x:any) => {
      x.image = `${environment.api}/${x.image}`
      this.findProduct = x;
    })
  }
  getProductIn4(){
    this.http.get(`${environment.api}/api/Productinformation/FindOneProductID?id=${this.id}`).subscribe((x:any) => {
      this.getFindOProductId = x;
    })
  }
  getProductIparam(){
    this.http.get(`${environment.api}/api/Product_IParameter/FindOneProductID?id=${this.id}`).subscribe((x:any) => {
      this.getFindOIProductId = x;
    })
  }
  getBrand(){
    this.http.get(`${environment.api}/api/Brand/GetBrand`).subscribe((x:any) => {
      x.image = `${environment.api}/${x.image}`
      this.listOfDataBrand = x
    })
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

  async cartCheckout(id: number){

    let storage = localStorage.getItem('cart')
    if(storage){
      this.cart = JSON.parse(storage)
    }

    let product:any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/FindOne?id=${id}`));

    let x:any = this.cart.find((item:any) => item.product.id === id)

    if(x){
      x.quantity += this.demoValue,
      x.price = x.quantity*product.price
    }else{
      this.cart.push({product, quantity: this.demoValue, price: (this.demoValue*product.price)})
    }
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.modal.create({
      nzTitle: '<i nz-icon nzType="shopping-cart" nzTheme="outline"></i> Giỏ hàng',
      nzContent: CartComponent,
      nzClosable: true,
      nzMaskClosable: false,
      nzFooter: null,
      nzWidth: 'auto'
    });

  }
}
