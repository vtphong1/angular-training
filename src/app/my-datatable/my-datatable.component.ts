import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../core/model/account.model';

@Component({
  selector: 'app-my-datatable',
  templateUrl: './my-datatable.component.html',
  styleUrls: ['./my-datatable.component.scss'],
})
export class MyDatatableComponent implements OnInit {
  @Input() account: any[] = [];
  @Output() clickEdit = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  @Output() clickAdd = new EventEmitter();
  @Input() searchStr = '';
  @Input() searchAdd = '';
  @Input() searchGen='';
  @Output() mySearch = new EventEmitter();
  @Input() itemsPerPage: number = 10;
  @Input() totalItems: number | undefined;
  @Input() page: number = 1;
  @Input() columns: any[] = [];
  @Output() clsortByAge = new EventEmitter();

  @Input() loading!: boolean;
  constructor() {}

  ngOnInit(): void {}
  openEdit(acc: Account) {
    this.clickEdit.emit(acc);
  }
  delete(acc: Account) {
    this.clickDelete.emit(acc);
  }
  openAddAccount() {
    this.clickAdd.emit();
  }
  search() {
    this.mySearch.emit([this.searchStr, this.searchAdd, this.searchGen]);
  }
  sortByAge() {
    this.clsortByAge.emit();
  }
}
