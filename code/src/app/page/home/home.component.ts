import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

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
  getOfProductOfBrandData: any[] = [];
  getOfBrandData: any[] = [];
  getOfOption1Data: any[] = [];
  getOfOption2Data: any[] = [];
  getOfOption3Data: any[] = [];
  countProduct: number = 0;


  async ngOnInit() {

  }

}
