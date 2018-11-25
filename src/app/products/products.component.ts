import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { Product } from './product.model';

import { Subscription, of } from 'rxjs';
import { ProductService } from './products.service';

const patternForProductsUrl = /^.*(reload\=true)$/;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  private subscription: Subscription[] = [];


  constructor(private _route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.products = this._route.snapshot.data.pageData;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter((event: NavigationEnd) => {
        return patternForProductsUrl.test(event.url);
      })
    ).subscribe(() => {
      this.subscription.push(this.productService.getProducts()
        .subscribe(elem => {
          this.products = elem;
        }));
    });
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe);
  }
}
