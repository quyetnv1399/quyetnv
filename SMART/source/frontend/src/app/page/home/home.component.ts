import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    margin:10,
    autoWidth: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0:{
        items: 2,
        nav: false
      },
      400: {
        items: 2,
        nav: false
      },
      740: {
        items: 3,
        nav: false
      },
      940: {
        items: 5
      }
    },
    nav: true,
    navText: [`<i nz-icon nzType="left-square" nzTheme="fill"></i>`,`<i nz-icon nzType="right-circle" nzTheme="fill"></i>`],
  }

  public tab: number = 0
  public id: number = 0
  cateList = [
    {
      id: 1,
      name: "Tủ lạnh"
    },
    {
      id: 2,
      name: "Máy giặt"
    },
    {
      id: 3,
      name: "Điều hòa"
    },
  ];

  getOfProductData: any[] = [];
  listOfDataCateProduct: any[] =[];
  getOfProductOfBrandData: any[] = [];
  getOfBrandData: any[] = [];
  getOfOption1Data: any[] = [];
  getOfOption2Data: any[] = [];
  getOfOption3Data: any[] = [];
  getOfCateData:any[] = [];
  countProduct: number = 0;
  listOfDisplayDataCateProduct: any[] = [];

  listOfDisplayData = [...this.getOfProductData];

  async ngOnInit() {

    await this.getProduct();
    this.findSaleProduct();

    await this.getBrand();

    if (this.getOfBrandData.length > 0) {
      this.getProductOfBrand(this.getOfBrandData[0].id);
    }

    this.getOption1();
    this.getOption2();
    this.getOption3();
    this.getMenu();
    this.findCateProduct();

    }

  async getProduct() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProduct`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`;
    }
    this.getOfProductData = x;
  }

  async getMenu() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetCate`))
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`;
    }
    this.getOfCateData = x;

  }

  async findCateProduct(){
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProduct`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`;
    }
    this.listOfDisplayDataCateProduct = x
  }

  findSaleProduct(){
    this.listOfDisplayData = this.getOfProductData.filter((item:any, index) => item.sale >= 15);
  }


  async getBrand() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetCategory`));
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`;
    }
    this.getOfBrandData = x;
  }
  async getOption1() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption/GetOption`));
    this.getOfOption1Data = x;
  }
  async getOption2() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption2/GetOption2`));
    this.getOfOption2Data = x;
  }
  async getOption3() {
    let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption3/GetOption3`));
    this.getOfOption3Data = x;
  }
  async getProductOfBrand(id: number) {
    this.id = id
    if (this.id !== 0) {
      let x: any = await firstValueFrom( this.http.get(`${environment.api}/api/Product/GetProductOfBrand?id=${id}`));
      for (const item of x) {
        item.image = `${environment.api}/${item.image}`;
      }
      this.getOfProductOfBrandData = x;
      this.countProduct = x.length
    } else {
      let x: any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/GetProduct`));
      this.getOfProductOfBrandData = x;
      this.countProduct = x.length
    }
  }
  findGetID(id: number) {
    this.id = id;
  }
}
