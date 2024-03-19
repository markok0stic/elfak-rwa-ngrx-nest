import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.css']
})
export class DashboardTableComponent {
  @Input() dataSource!: any[];
  @Input() title!: string;
  @Input() columnsToDisplay!: string[];
}
