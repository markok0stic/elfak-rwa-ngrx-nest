import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent {
  @Input() title!: string;
  @Input() count!: string | number;
  @Input() icon!: string;
  @Input() color!: string;
}
