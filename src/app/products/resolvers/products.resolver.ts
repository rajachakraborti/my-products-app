import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import {map, delay, catchError} from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})


export class ProductsResolver implements Resolve<Observable<Product[]>> {

  constructor(private productService: ProductService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getProducts()
    .pipe(delay(2000))
    .pipe(map((x) => {
      console.log(x);
      return x;
    }))
    .pipe(catchError( error => of([])))
  }
}
