import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { LoggingInterceptor } from '../core/logging.interceptor';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../products/products.service';
import { DropdownDirective } from './dropdown.directive';
import { CategoryService } from '../category/category.service';
@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    DropdownDirective
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    DropdownDirective
  ],
  providers: [
    AuthService,
    ProductService,
    CategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
  ]
})
export class CoreModule { }
