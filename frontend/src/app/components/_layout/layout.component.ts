import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  sidenavOpened = true;

  constructor(private store: Store, private router: Router) {}
}
