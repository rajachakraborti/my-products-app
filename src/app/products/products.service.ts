import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { map, catchError } from 'rxjs/operators';

import { Product } from './product.model';
import {BaseApiService} from './../core/base-api.service';


import { baseUrl} from './../core/core.constants';

@Injectable()
export class ProductService extends BaseApiService {

  productsBaseUrl = '/Products';

  constructor(private http: HttpClient) { 
    super();
  }

  getProducts() : Observable<Product[]>{
    console.log(baseUrl)
    return this.http.get<Product[]>(`${baseUrl}${this.productsBaseUrl}`)
      .pipe(map((res: any) => {
        return  res.map(elem => {
          return new Product(elem.ProductId).addName(elem.Name)
            .addDescription(elem.Description);
        });
      }),
      catchError(this.handleError));
  }
}
