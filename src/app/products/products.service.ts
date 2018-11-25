import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { map, catchError } from 'rxjs/operators';

import { Product } from './product.model';
import { BaseApiService } from './../core/base-api.service';


import { baseUrl } from './../core/core.constants';
import { Category } from '../category/category.model';

@Injectable()
export class ProductService extends BaseApiService {

  productsBaseUrl = '/Products';

  constructor(private http: HttpClient) {
    super();
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}${this.productsBaseUrl}`)
      .pipe(map((res: any) => {
        return res.map(elem => {
          return new Product(elem.ProductId).addName(elem.Name)
            .addDescription(elem.Description);
        });
      }),
        catchError(this.handleError));
  }

  getProductDetails(id: number): Observable<Product> {
    return this.http.get<Product[]>(`${baseUrl}${this.productsBaseUrl}/${id}`)
      .pipe(map((elem: any) => {
        const newProduct = new Product(elem.ProductId).addName(elem.Name)
          .addDescription(elem.Description)
          .addUrl(elem.Url)
          .addCategories(!elem.Categories ? [] : elem.Categories.map(cat => new Category(cat.CategoryId, cat.Name)));
        return newProduct;
      }),
        catchError(this.handleError));
  }

  update(id: number, payload: any) {
    return this.http.put(`${baseUrl}${this.productsBaseUrl}/${id}`,
      payload, { observe: 'response' })
      .pipe(map(x => {
        return {success: x.status === 204 ?   true : false}
      }),
        catchError(this.handleError))
  }

  save(payload: any) {
    return this.http.post(`${baseUrl}${this.productsBaseUrl}`,
      payload, { observe: 'response' })
      .pipe(map(x => {
        return {success: x.status === 201 ?  true : false}
      }),
        catchError(this.handleError))
  }
}
