import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-add-new',
  templateUrl: './table-add-new.component.html',
  styleUrls: ['./table-add-new.component.css']
})
export class TableAddNewComponent {
  @Input() buttonText: string;

  constructor() {
    this.buttonText = '';
  }
}
