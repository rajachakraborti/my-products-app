import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import { Product } from './../product.model';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges {
  @Input('products') products: Product[];
  currentPage = 1;
  productSnapShot: Product[]
  totalRecords = 0;
  pageSize = 5;
  hidePagination = false;


  constructor(private _route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private _router: Router) { }

  ngOnInit() {
    this.totalRecords = this.products.length;
    this.productSnapShot = this.products.slice(0, this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.totalRecords = this.products.length;
    this.productSnapShot = this.products.slice(0, this.pageSize);
    this.currentPage = 1;
  }
  onNewProduct() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  pageChanged(valPassed: number) {
    this.currentPage = valPassed;
    const start = this.currentPage * this.pageSize - 1;
    const last = (this.currentPage + 1) * this.pageSize - 1
    this.productSnapShot = this.products.slice(start, last);
  }
}
