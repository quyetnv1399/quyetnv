import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-menu-mobile',
  templateUrl: './modal-menu-mobile.component.html',
  styleUrls: ['./modal-menu-mobile.component.scss']
})
export class ModalMenuMobileComponent implements OnInit {

  constructor(private http: HttpClient) { }

  listOfBrand: any[] = [];
  listOption: any[] = [];
  listOption2: any[] = [];
  listOption3: any[] = [];

  getOfOption1Data: any[] = [];
  getOfOption2Data: any[] = [];
  getOfOption3Data: any[] = [];

  async ngOnInit() {
    this.getBrand();
    this.getOption1();
    this.getOption2();
    this.getOption3();
  }

  async getBrand(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/GetBrand`));
    this.listOfBrand = x
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
}
