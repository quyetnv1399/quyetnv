import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

declare let $: any;
@Component({
  selector: 'app-form-brand',
  templateUrl: './form-brand.component.html',
  styleUrls: ['./form-brand.component.scss']
})
export class FormBrandComponent implements OnInit {
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

  async ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      image: [],
      isActive: [],
    })

    if(this.id){
      let x:any = await firstValueFrom(this.http.get(`${environment.api}/api/Brand/FindOne?id=${this.id}`));
        this.profileForm.patchValue({
          name: x.name,
          isActive: this.ngChecked,
        })
        this.ngChecked = x.active
    }else{
      this.profileForm.patchValue({
        isActive: this.ngChecked,
      })
    }

    if (!this.id) {
      await this.profileForm.get('image')?.setValidators(Validators.required);
    }


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

  async onSubmitForm(){

    this.profileForm.value.isActive
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('isActive', this.profileForm.value.isActive)
    let file = $('#file').prop('files');
    if (file) {
      formData.append('image', file[0]);
    }

    if(!this.id){
      await firstValueFrom(this.http.post(`${environment.api}/api/Brand/AddBrand`, formData))
      this.message.success('Thêm thành công !!')
    }else{
      await firstValueFrom(this.http.put(`${environment.api}/api/Brand/EditBrand?id=${this.id}`, formData))
      this.message.success('Sửa thành công !!')
    }

    this.onClose.emit(true);
  }

  onCloseTab(){
    this.onClose.emit(true);
  }
}
