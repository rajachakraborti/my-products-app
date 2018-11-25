import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { Subscription} from 'rxjs'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit , OnDestroy{
  public product: Product;
  private subscription : Subscription[]= [];

  constructor(private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.subscription.push(this._route.params.subscribe((params) => {
      this.product = this._route.snapshot.data.pageData;
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

  onEditProduct() {
    this._router.navigate(['edit'], {relativeTo: this._route});
  }
}
