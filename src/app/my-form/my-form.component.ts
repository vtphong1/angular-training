import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../core/model/account.model';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent implements OnInit {
  myForm!: FormGroup;
  @Output() clickSubmit = new EventEmitter();
  @Output() clickCloseForm = new EventEmitter();
  @Input() isOpenAddAccount: boolean | undefined;
  @Input() isOpenEditAccount: boolean | undefined;
  @Input() selectedAccount!: Account;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      _id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(18)]],
      gender: '',
      address: ['', Validators.required],
      employer: [''],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
      phonenumber: [
        null,
        [Validators.required, Validators.pattern('[0-9]{9,}')],
      ],
      city: [''],
      state: [''],
    });

    if (this.isOpenEditAccount == true) {
      this.myForm.patchValue({
        _id: this.selectedAccount._id,
        firstname: this.selectedAccount.firstname,
        lastname: this.selectedAccount.lastname,
        age: this.selectedAccount.age,
        gender: this.selectedAccount.gender,
        address: this.selectedAccount.address,
        employer: this.selectedAccount.employer,
        email: this.selectedAccount.email,
        city: this.selectedAccount.email,
        state: this.selectedAccount.state,
      });
    }
  }
  closeForm() {
    this.myForm.reset();
    this.clickCloseForm.emit(false);
  }
  onSubmit() {
    // if (this.myForm.valid) {
    //   this.clickSubmit.emit(this.myForm.value);
    // } else {
    //   for (let i in this.myForm.controls) {
    //     this.myForm.controls[i].markAsTouched();
    //   }
    // }

    this.clickSubmit.emit(this.myForm.value);
  }
}
