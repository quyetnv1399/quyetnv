import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  demoValue = 1;
  checked = true;
  countProduct: number = 0;
  total: number = 0;

  cart: any[] = [];

  profileForm!: FormGroup;
  ngOnInit() {

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      move: ['', Validators.required],
      gender: ['', Validators.required],
      note: [''],
      day: ['', Validators.required]
    })

    this.profileForm.patchValue({
      day: 1
    })
    this.getCart();
  }



  getCart(){
    let storage = localStorage.getItem('cart')
    let x:any = JSON.parse(storage || '{}')

    for (const item of x) {
      item.product.image = `${environment.api}/${item.product.image}`;
      this.demoValue = item.quantity
    }
    let y:any = x.reduce((totalPrice:number, currentValue:any) => totalPrice + currentValue.price,0)
    this.total = y
    this.cart = x
    this.countProduct = x.length
  }
  removeItemCart(id: number){
    let storages = localStorage.getItem('cart')
    if(storages){
      this.cart = JSON.parse(storages)
    }
    this.cart = this.cart.filter(x => x.product.id !== id);

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getCart()
  }

  onSaveOrder(){

    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;
    console.log(this.profileForm.value);
  }

}
