import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { Observable, of } from 'rxjs';
import { State } from '../../models/state';

export enum ViewMode {
  TABLE,
  ADD,
  EDIT
}

export type TableAdditionalActions = {
  icon: string,
  matToolTip: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<TData> implements AfterViewInit {
  @Input() data$: Observable<State<TData>>;
  @Input() displayedColumns: string[];
  @Input() editEnabled: boolean;
  @Input() actionsEnabled: boolean;
  @Input() additionalActions?: TableAdditionalActions;
  @Input() headerEnabled: boolean;

  dataSource: MatTableDataSource<TData>;
  loading: boolean;
  currentViewMode: ViewMode;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() edit = new EventEmitter<TData>();
  @Output() delete = new EventEmitter<TData>();
  @Output() additional = new EventEmitter<TData>();
  protected readonly ViewMode = ViewMode;

  constructor(private cdr: ChangeDetectorRef) {
    this.editEnabled = true;
    this.headerEnabled = true;
    this.actionsEnabled = true;
    this.data$ = of();
    this.displayedColumns = [];
    this.actionsEnabled = true;
    this.loading = false;
    this.currentViewMode = ViewMode.TABLE;
    this.dataSource = new MatTableDataSource<TData>([]);
  }

  ngAfterViewInit() {
    this.data$.subscribe(data => {
      this.loading = data.loading;
      this.dataSource = new MatTableDataSource<TData>();
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    });
  }

  getTableColumns(): string[] {
    let columns = this.displayedColumns;
    if (this.actionsEnabled) {
      columns = [...columns, 'action'];
    }

    return columns;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleView(view: ViewMode) {
    this.currentViewMode = view;
  }

  handleEdit(el: TData) {
    this.edit.emit(el);
    this.toggleView(ViewMode.EDIT);
  }

  handleDelete(el: TData) {
    this.delete.emit(el);
  }

  handleAdditional(el: TData) {
    this.additional.emit(el)
  }
}
