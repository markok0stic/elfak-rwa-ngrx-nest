import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../../services/sales/reports.service';
import { ProductSalesModel } from '../../models/dashboard/product.sales.model';
import { Observable, of } from 'rxjs';
import { State } from '../../models/state';
import { Statement } from '@angular/compiler';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  salesByDateForm: FormGroup;
  monthlySales: Observable<State<ProductSalesModel>>;
  columnsToDisplay: string[];

  constructor(private reportsService: ReportsService,
              private _formBuilder: FormBuilder) {
    this.monthlySales = of({
      data:[],
      loading: false,
      error: null
    });
    this.salesByDateForm = this._formBuilder.group({
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null),
    })
    this.columnsToDisplay = ['title', 'totalSold', 'totalQuantity']
  }

  ngOnInit() {
  }

  generateReport() {
    if (this.salesByDateForm.valid) {
      const data = this.salesByDateForm.value;
      this.reportsService.getSalesReportByDate(data.startDate, data?.endDate).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = `sales-report-${data.startDate.toDateString()}-${data.endDate?.toDateString() ?? new Date().toDateString()}.pdf`;
        anchor.href = url;
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    }
  }
}
