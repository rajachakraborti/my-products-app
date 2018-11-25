import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { delay } from "rxjs/operators";
import { map, catchError } from 'rxjs/operators';

import { Category } from './category.model';
import { BaseApiService } from './../core/base-api.service';


import { baseUrl } from './../core/core.constants';

  
@Injectable()
export class CategoryService extends BaseApiService {

  categoriesBaseUrl = '/Categories';

  constructor(private http: HttpClient) {
    super();
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}${this.categoriesBaseUrl}`)
      .pipe(map((res: any) => {
        return res.map(elem => {
          return new Category(elem.CategoryId, elem.Name);
        });
      }),
        catchError(this.handleError));
  }
}
