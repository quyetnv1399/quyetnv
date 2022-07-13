import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewInformation',
  templateUrl: './viewInformation.component.html',
  styleUrls: ['./viewInformation.component.scss']
})
export class ViewInformationComponent implements OnInit {
  @Input() id:number | null = null;
  @Input() mode!: string;
  @Output() onClose = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  getFindOProductId: any;
  getFindOIProductId: any;
  getOpt3: any[] = [];
  findOneDataProduct: any;

  ngOnInit() {
    this.getProductIn4();
    this.getProductIparam();
    this.getOp3();
    this.finOneProduct();
  }

  finOneProduct(){
    this.http.get(`${environment.api}/api/Product/FindOne?id=${this.id}`).subscribe((x:any) => {
      this.findOneDataProduct = x;
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
  getOp3(){
    this.http.get(`${environment.api}/api/ProductOption3/GetOption3`).subscribe((x:any) => {
      this.getOpt3 = x;
    })
  }

}
