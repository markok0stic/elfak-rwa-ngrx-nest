import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as PdfPrinter from 'pdfmake';
import { Sale } from './entities/sale.entity';
import * as path from 'path';
import { SaleDetail } from './entities/sale.details.entity';
import { ProductSalesDto } from '../dashboard/dto/product.sales.dto';

@Injectable()
export class ReportService {
  private fonts: any;
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private readonly saleDetailsRepository: Repository<SaleDetail>,
  ) {
    const fontsDir = path.join(__dirname, '..', '..', '..', '..', 'fonts');

    this.fonts = {
      Roboto: {
        normal: path.join(fontsDir, 'roboto.regular.ttf'),
        bold: path.join(fontsDir, 'roboto.bold.ttf'),
        italics: path.join(fontsDir, 'roboto.italic.ttf'),
        bolditalics: path.join(fontsDir, 'roboto.bolditalic.ttf'),
      },
    };
  }

  async generateSaleReportById(id: number): Promise<Buffer> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: { saleDetails: { product: true } },
    });

    if (!sale) throw new BadRequestException(`No sale with ID: ${id} found`);

    return await this.generateSalesReport([sale]);
  }

  async generateSaleReportByDate(
    dateFrom: Date,
    dateTo: Date = new Date(),
  ): Promise<Buffer> {
    const sales = await this.saleRepository.find({
      where: {
        createdOn: Between(dateFrom, dateTo),
      },
      relations: { saleDetails: { product: true } },
    });

    return this.generateSalesReport(sales);
  }

  async generateSalesReport(sales: Sale[]): Promise<Buffer> {
    const printer = new PdfPrinter(this.fonts);
    const docDefinition = {
      content: [
        { text: 'Inventory Manager - Sale Report', style: 'header' },
        this.buildSalesTable(sales),
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
        },
      },
    };

    return new Promise((resolve, reject) => {
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      const chunks: Uint8Array[] = [];

      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });
  }

  buildSalesTable(sales: Sale[]): any {
    const content = [];

    sales.forEach((sale) => {
      content.push({
        text: `Date: ${sale.createdOn.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}`,
        style: 'subheader',
      });

      content.push(this.buildContentTable(sale));
    });

    return content;
  }

  buildContentTable(sale: Sale): any {
    const body = [];

    const headers = [
      '#',
      'Product Sku',
      'Product Title',
      'Buying Price',
      'Selling Price',
      'Total Qty',
      'TOTAL',
    ];
    body.push(headers);

    let i = 0;
    sale.saleDetails.forEach((detail) => {
      const row = [];
      row.push(i++);
      row.push(detail.product.sku);
      row.push(detail.product.name);
      row.push(detail.product.purchasePrice.toFixed(2));
      row.push(detail.salesPrice.toFixed(2));
      row.push(detail.quantity);
      const total = (detail.salesPrice * detail.quantity).toFixed(2);
      row.push(total);
      body.push(row);
    });

    const grandTotal = sale.total.toFixed(2);
    const profit = (
      sale.total -
      sale.saleDetails.reduce(
        (accDet, detail) =>
          accDet + detail.product.purchasePrice * detail.quantity,
        0,
      )
    ).toFixed(2);

    body.push(['', '', '', '', '', 'GRAND TOTAL', grandTotal]);
    body.push(['', '', '', '', '', 'PROFIT', profit]);

    return {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto', 'auto'],
        body: body,
      },
      layout: 'lightHorizontalLines',
    };
  }

  async getMonthlySalesByProduct(month: string): Promise<ProductSalesDto[]> {
    return await this.saleDetailsRepository
      .createQueryBuilder('saleDetail')
      .select('product.name', 'title')
      .addSelect('SUM(saleDetail.quantity)', 'totalQuantity')
      .addSelect('COUNT(sale.id)', 'totalSold')
      .innerJoin('saleDetail.product', 'product')
      .innerJoin('saleDetail.sale', 'sale')
      .where(`TO_CHAR(sale.createdOn, 'YYYY-MM') = :month`, { month })
      .groupBy('product.name')
      .getRawMany();
  }
}
