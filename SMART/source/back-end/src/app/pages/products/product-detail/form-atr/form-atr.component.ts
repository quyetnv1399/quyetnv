import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-atr',
  templateUrl: './form-atr.component.html',
  styleUrls: ['./form-atr.component.scss']
})
export class FormAtrComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  profileForm!: FormGroup;

  listOfField: Array<{ indexId: number; controlName: string }> = [];

  ngOnInit() {
    this.profileForm = this.fb.group({});
    this.addField();
  }

  addField(e?: MouseEvent){
    if (e) {
      e.preventDefault();
    }
    const indexId = this.listOfField.length > 0 ? this.listOfField[this.listOfField.length - 1].indexId + 1 : 0;

    const control = {
      indexId,
      controlName: `name${indexId}`,
    };

    const index = this.listOfField.push(control)
    console.log(this.listOfField[this.listOfField.length - 1]);
    // this.profileForm.addControl( this.listOfField[index - 1].controlName, new FormControl(null, Validators.required));
  }

  removeField(i: { indexId: number; controlName: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfField.length > 1) {
      const index = this.listOfField.indexOf(i);
      this.listOfField.splice(index, 1);
      console.log(this.listOfField);
      this.profileForm.removeControl(i.controlName);
    }
  }

  onSubmit(){
    if (this.profileForm.valid) {
      console.log('submit', this.profileForm.value);
    } else {
      Object.values(this.profileForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
