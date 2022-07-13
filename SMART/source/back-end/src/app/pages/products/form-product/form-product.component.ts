import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

declare let $: any;
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  @Input() id: number | null = null;
  @Input() mode!: string;
  @Output() onClose = new EventEmitter<any>();


  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private http: HttpClient,
    private message: NzMessageService
  ) { }


  miniCateOption: boolean = true;
  showOnSalePrice: boolean = false


  ngDisable: boolean = false;

  ngChecked: boolean = true;
  ngUnCheckedNew: boolean = false;
  ngUnCheckedHot: boolean = false;
  listOfDataCate: any[] = [];
  listOfDataBrand: any[] = [];
  listOfDataCateParent: any[] = [];
  idCate: number = 0;

  price: any;

  profileForm!: FormGroup

  public priceChange: any;

  async ngOnInit() {
    this.profileForm = this.fb.group({
      id: [''],
      code_product: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      priceFormat: ['',  Validators.required],
      sale_price: ['', Validators.required],
      price_after_sale: [''],
      price_after_sale_format: ['', Validators.required],
      image: [],
      quantity: ['', Validators.required],
      view: ['', Validators.required],
      brand: ['', Validators.required],
      isActive: ['', Validators.required],
      isHot: ['', Validators.required],
      isNew: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      categoryParent: ['', Validators.required],
      start_date: [''],
      end_date: [''],
    })

    await this.getCategory();
    await this.getBrand();

    if(this.id){
      this.showOnSalePrice = true
      let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Product/FindOne?id=${this.id}`))
      let y:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/FindOne?id=${x.categorY_ID}`))
      let z:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductSale/FindOne?id=${x.id}`))
      this.ngChecked = x.isactive;
      this.ngUnCheckedHot = x.ishot;
      this.ngUnCheckedNew = x.isnew;
      console.log(z);
      if(z){
        this.profileForm.patchValue({
          sale_price: z.salevalue,
          start_date: z.startdate,
          end_date: z.enddate,
        })
      }
      this.profileForm.patchValue({
        id: this.id,
        name: x.name,
        code_product: x.codE_PRODUCT,
        description: x.description,
        price: this.currencyPipe.transform((x.price), 'VND', 'symbol', '1.0-1'),
        priceFormat: x.price,
        price_after_sale: this.currencyPipe.transform((x.saleprice), 'VND', 'symbol', '1.0-1'),
        price_after_sale_format: x.saleprice,
        quantity: x.quantity,
        isNew: this.ngUnCheckedNew,
        isHot: this.ngUnCheckedHot,
        isActive: this.ngChecked,
        view: x.view,
        brand: x.branD_ID,
        category: y.parenT_ID,
        categoryParent: x.categorY_ID,
      })
    }else{
      this.profileForm.patchValue({
        price: 0,
        priceFormat: 0,
        sale_price: 0,
        price_after_sale: 0,
        price_after_sale_format: 0,
        quantity: 1,
        view: 0,
        isNew: this.ngUnCheckedNew,
        isHot: this.ngUnCheckedHot,
        isActive: this.ngChecked,
        brand: '',
        category: '',
        categoryParent: '',
        start_date: '',
        end_date: ''
      })
    }

    if (!this.id) {
      await this.profileForm.get('image')?.setValidators(Validators.required);
    }

    if(this.id){
      if(this.profileForm.value.category !== ""){
        this.miniCateOption = false
        let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetListCateParent?id=${this.profileForm.value.category}`))
        this.listOfDataCateParent = x
      }
    }

    this.priceChange = this.profileForm.valueChanges.subscribe(f => { //change value model
      if (f.price) {
        // bắn giá tiền vào form
        this.profileForm.patchValue({ //format price
          price: this.currencyPipe.transform(f.price.replace(/\D/g, '').replace(/^0+/, ''), 'VND', 'symbol', '1.0-1'),

        }, { emitEvent: false });
      }

      if (f.price) {
        let total = 0

        if (f.sale_price) {
          // Tính giá sale
          total = (f.sale_price * (+f.price.replace(/\₫/g, '').replace(/\,/g, ''))) / 100
        } else {
          // default giá gốc
          total = +f.price.replace(/\₫/g, '').replace(/\,/g, '')
        }

        this.profileForm.patchValue({
          // format lại giá tiền về dạng number
          priceFormat: +f.price.replace(/\₫/g, '').replace(/\,/g, ''),
          // bắn giá tiền đã sale vào form number
          price_after_sale_format: (+f.price.replace(/\₫/g, '').replace(/\,/g, '')) - total
        }, { emitEvent: false })
      }

      if (f.price) {
        this.profileForm.patchValue({
          //format price từ giá tiền đã giảm đẩy lên view cho dễ nhìn
          price_after_sale: this.currencyPipe.transform(this.profileForm.value.price_after_sale_format, 'VND', 'symbol', '1.0-1'),

        }, { emitEvent: false });
      }
    })


  }


  ngOnDestroy(): void {
    this.priceChange.unsubscribe();
  }

  async onSelectFile(e: any) {
    if (e.target.files.length > 0) {
      let file: any = await e.target.files[0];
      this.profileForm.patchValue({
        image: file.name
      });
    } else {
      this.profileForm.patchValue({
        image: null
      });
    }
  }

  showMoreControlNews(e: any) {
    this.ngUnCheckedNew = e
    this.profileForm.patchValue({
      isNew: e
    })
  }
  showMoreControlHots(e: any) {
    this.ngUnCheckedHot = e
    this.profileForm.patchValue({
      isHot: e
    })
  }
  showMoreControls(e: any) {
    this.ngChecked = e
    this.profileForm.patchValue({
      isActive: e
    })

  }
  changeDateSale(e:any){

    if(e.target.value !== "true"){
      this.ngDisable = true
    }else{
      this.ngDisable = false
    }
  }

  async onSubmitForm() {

    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    let formatPrice = this.profileForm.value.priceFormat
    let formatPriceSale = this.profileForm.value.price_after_sale_format
    const formData = new FormData();
    const formDataProductSale = new FormData();
    formData.append('CODE_PRODUCT', this.profileForm.value.code_product)
    formData.append('NAME', this.profileForm.value.name)
    formData.append('PRICE', formatPrice)

    formData.append('BRAND_ID', this.profileForm.value.brand)
    formData.append('QUANTITY', this.profileForm.value.quantity)
    formData.append('VIEW', this.profileForm.value.view)
    formData.append('ISACTIVE', this.profileForm.value.isActive)
    formData.append('ISHOT', this.profileForm.value.isHot)
    formData.append('ISNEW', this.profileForm.value.isNew)
    formData.append('DESCRIPTION', this.profileForm.value.description)
    formData.append('CATEGORY_ID', this.profileForm.value.categoryParent)

    let file = $('#file').prop('files');
    if (file) {
      formData.append('IMAGE', file[0]);
    }
    if(this.profileForm.value.sale_price > 0){
      formDataProductSale.append('STARTDATE', "null" )
      formDataProductSale.append('ENDDATE',  "null")
      formDataProductSale.append('SALEVALUE', this.profileForm.value.sale_price )
      formDataProductSale.append('PRODUCT_ID', this.profileForm.value.id)
    }else{}
    if(this.id){
      let z:any = await firstValueFrom(this.http.get(`${environment.api}/api/ProductSale/FindOne?id=${this.profileForm.value.id}`));
      if(z){
        await firstValueFrom(this.http.put(`${environment.api}/api/ProductSale/EditSaleProduct?id=${this.profileForm.value.id}`, formDataProductSale))
      }else{
        await firstValueFrom(this.http.post(`${environment.api}/api/ProductSale/AddSaleProduct`, formDataProductSale))
      }
    }
    if(this.profileForm.value.sale_price > 0){
      formData.append('SALEPRICE', formatPriceSale)
    }

    if(!this.id){
      await firstValueFrom(this.http.post(`${environment.api}/api/Product/AddProduct`, formData))
      this.message.success('Thêm thành công !!')
    }else{
      await firstValueFrom(this.http.put(`${environment.api}/api/Product/EditProduct?id=${this.id}`, formData))
      this.message.success('Sửa thành công !!')
    }

    this.onClose.emit(true);

  }

  onCloseTab() {
    this.onClose.emit(true);
  }

  async getCategory(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetParent`))
    this.listOfDataCate = x
  }
  async getBrand(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/GetBrand`))
    this.listOfDataBrand = x
  }

  async changeCate(e: any){

    if(e.target.value !== ""){
      this.miniCateOption = false
      this.profileForm.patchValue({
        category: e.target.value
      })
      let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetListCateParent?id=${this.profileForm.value.category}`))
      this.listOfDataCateParent = x
    }else{
      this.miniCateOption = true
    }

  }

  async getCategoryParent(id: number){

  }

}
