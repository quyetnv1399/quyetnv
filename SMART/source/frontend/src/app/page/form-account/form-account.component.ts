import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})
export class FormAccountComponent implements OnInit {

  constructor() { }
  tabs = [1, 2, 3];
  ngOnInit() {
  }

}
