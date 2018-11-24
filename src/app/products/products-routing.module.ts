import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { ProductsComponent } from './products.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsResolver } from './resolvers/products.resolver';

const productsRoutes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      { path: '', component: ProductStartComponent },
      { path: 'new', component: ProductEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent, canActivate: [AuthGuard] },
    ], resolve: {
      pageData: ProductsResolver
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class ProductsRoutingModule { }
