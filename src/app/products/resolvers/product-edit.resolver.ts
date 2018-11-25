import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { catchError, filter, map } from 'rxjs/operators';
import { Category } from 'src/app/category/category.model';
import { CategoryService } from 'src/app/category/category.service';

interface IReturn {
    product: Product,
    availableCategories: Category[]
}


@Injectable({
    providedIn: 'root'
})
export class ProductEditResolver implements Resolve<Observable<IReturn>> {

    constructor(private productService: ProductService,
        private categoryService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReturn> {
        const id = route.params.id;
        if (!id) {
            console.log('this shouldnt happen, show toastmsg');
        }
        // wait for both to resolve, before going to next page.
        // We can show a progress bar here
        return forkJoin([
            this.productService.getProductDetails(id),
            this.categoryService.getCategories()
        ]).pipe(map(results => ({
            product: results[0] as Product,
            availableCategories: results[1] as Category[]
        })));

    }
}