import { Component, OnInit,  Input } from '@angular/core';

import { Product } from './../product.model';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  @Input('products') products: Product[];
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
          /*this.products = this._route.snapshot.data.pageData;
          // when child is changing the name or any data,
          // the parent should pick up the chnange.
          this.subscription.push(this._route.firstChild.paramMap.subscribe(
            (param: ParamMap) => {
              this.subscription.push(this.productService.getProducts()
                  .subscribe(x => this.products = x));
            }
          ))*/
  }

  onNewProduct() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }


}
