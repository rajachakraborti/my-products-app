import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../products.service';
import { catchError, filter, map } from 'rxjs/operators';
import { Category } from '../../category/category.model';
import { CategoryService } from '../../category/category.service';

interface IReturn {
    availableCategories: Category[]
}


@Injectable({
    providedIn: 'root'
})
export class ProductNewResolver implements Resolve<Observable<IReturn>> {

    constructor(private productService: ProductService,
        private categoryService: CategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReturn> {
        const id = route.params.id;
        if (!id) {
            console.log('this shouldnt happen, show toastmsg');
        }
        return this.categoryService.getCategories().pipe(map(results => ({
            availableCategories: results as Category[]
        })));

    }
}