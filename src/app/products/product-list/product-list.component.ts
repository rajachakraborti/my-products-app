import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from './../product.model';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { Subscription,  of } from 'rxjs';
import { ProductService } from '../products.service';
import {map, catchError} from 'rxjs/operators';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription[] = [];
  constructor(private _route: ActivatedRoute,
    private productService: ProductService,
    private _router: Router) { }

  ngOnInit() {
          this.products = this._route.snapshot.data.pageData;
          // when child is changing the name or any data,
          // the parent should pick up the chnange.
          this.subscription.push(this._route.firstChild.paramMap.subscribe(
            (param: ParamMap) => {
              this.subscription.push(this.productService.getProducts()
                  .subscribe(x => this.products = x));
            }
          ))
  }

  onNewProduct() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }

}
