import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-cateAction',
  templateUrl: './cateAction.component.html',
  styleUrls: ['./cateAction.component.scss']
})
export class CateActionComponent implements OnInit {
  @Input() id: number | null = null;
  @Output() onClose = new EventEmitter<any>();
  constructor(private http: HttpClient) { }

  brandData: any[] = [];
  brlength: number = 0;
  option3Data: any[] = [];
  op3length: number = 0
  option2Data: any[] = [];
  op2length: number = 0
  optionData: any[] = [];
  op1length: number = 0

  size: NzButtonSize = 'default';

  async ngOnInit() {
    // debugger;
    if(this.id === 0){
      this.slBrands();
    }else if( this.id === 2){
      this.slOption3();
    }else if( this.id === 3){
      this.slOption2();
      this.slOption1();
    }

  }

  async slBrands(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/GetBrand`))
    for (const item of x) {
      item.image = `${environment.api}/${item.image}`
    }
    this.brandData = x
    this.brlength = x.length
  }

  async slOption3(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption3/GetOption3`))
    this.option3Data = x
    this.op3length = x.length

  }

  async slOption2(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption2/GetOption2`))
    this.option2Data = x
    this.op2length = x.length

  }

  async slOption1(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductOption/GetOption`))
    this.optionData = x
    this.op1length = x.length
  }

}
