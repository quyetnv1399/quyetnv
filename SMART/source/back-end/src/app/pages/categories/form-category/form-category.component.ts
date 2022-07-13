import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

declare let $:any
@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {
  @Input() id: number | null = null;
  @Input() mode!: string;
  @Output() onClose = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
    ) { }
  defaultValue: number = 0;

  ngChecked: boolean = true
  profileForm!: FormGroup;

  showParentCate: any[] = [];

  async ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      image: [],
      isActive: [],
      parentCate: []
    })

    if(this.id){
      let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/FindOne?id=${this.id}`));
        this.profileForm.patchValue({
          name: x.name,
          isActive: this.ngChecked,
          parentCate: x.parenT_ID
        })
        this.ngChecked = x.active
    }else{
      this.profileForm.patchValue({
        isActive: this.ngChecked,
        parentCate: 0,
      })
    }

    if (!this.id) {
      await this.profileForm.get('image')?.setValidators(Validators.required);
    }

    this.getParentCate()

  }

  async onSelectFile(e:any){
    if (e.target.files.length > 0) {
      let file: any = await e.target.files[0];
      this.profileForm.patchValue({
        image: file.name
      });
    }else{
      this.profileForm.patchValue({
        image: null
      });
    }
  }

  showMoreControls(e:any){
    this.ngChecked = e ;
  }

  async getParentCate(){
    let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Category/GetParent`));
    this.showParentCate = x
  }

  async onSubmitForm(){

    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('active', this.profileForm.value.isActive)
    let file = $('#file').prop('files');
    if (file) {
      formData.append('image', file[0]);
    }
    formData.append('parentId', this.profileForm.value.parentCate);

    if(!this.id){
      await firstValueFrom(this.http.post(`${environment.api}/api/Category/AddCategory`, formData))
      this.message.success('Thêm thành công !!')
    }else{
      await firstValueFrom(this.http.put(`${environment.api}/api/Category/EditCategory?id=${this.id}`, formData))
      this.message.success('Sửa thành công !!')
    }

    this.onClose.emit(true);
  }

  onCloseTab(){
    this.onClose.emit(true);
  }

}
