import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<TData> implements AfterViewInit {
  @Input() data$: Observable<State<TData>>;
  @Input() displayedColumns: string[];
  @Input() selectEnabled: boolean;
  @Input() actionsEnabled: boolean;

  dataSource: MatTableDataSource<TData>;
  selection: SelectionModel<TData>;
  loading: boolean;
  currentViewMode: ViewMode;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() edit = new EventEmitter<TData>();
  @Output() delete = new EventEmitter<TData>();

  constructor(private cdr: ChangeDetectorRef) {
    this.data$ = of();
    this.displayedColumns = [];
    this.selectEnabled = true;
    this.actionsEnabled = true;
    this.loading = false;
    this.currentViewMode = ViewMode.TABLE;
    this.dataSource = new MatTableDataSource<TData>([])
    this.selection = new SelectionModel<TData>(true, []);
  }

  ngAfterViewInit() {
    this.data$.subscribe(data => {
      this.loading = data.loading;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges();
    });
  }

  getTableColumns(): string[] {
    let columns = this.displayedColumns;
    if (this.selectEnabled) {
      columns = ['select', ...columns];
    }
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: TData): string {
    if(this.dataSource) {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
    }
    return 'deselect all';
  }

  toggleView(view: ViewMode) {
    this.currentViewMode = view;
  }

  handleEdit(el: TData) {
    this.edit.emit(el);
    this.toggleView(ViewMode.EDIT);
  }

  handleDelete(el: TData) {
    this.delete.emit(el)
  }

  protected readonly ViewMode = ViewMode;
}
