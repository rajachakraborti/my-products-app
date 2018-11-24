import { Component, OnInit } from '@angular/core';

import { Product} from './../product.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.products = this._route.snapshot.data.pageData;
    console.log(this.products)
  }

  onNewProduct() {
  }

}
