import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { catchError, filter } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<Observable<Product>> {
    constructor(private productService: ProductService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
        const id = route.params.id;
        if (!id) {
            console.log('this shouldnt happen, show toastmsg');
        }
        return this.productService.getProductDetails(id)
            .pipe(catchError(error => of({} as Product)));
    }
}