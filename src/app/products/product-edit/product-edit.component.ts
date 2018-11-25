import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { Category } from 'src/app/category/category.model';
import { ProductService } from '../products.service';
import { catchError, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  editMode = false;
  productEditForm: FormGroup;
  product: Product;
  availableCategories: Category[];
  subscription: Subscription[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.productEditForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(2)
        , Validators.maxLength(20)]),
      'url': new FormControl('', [Validators.required, Validators.minLength(2)
        , Validators.maxLength(20)]),
      'description': new FormControl('', [Validators.required,
      Validators.maxLength(20), Validators.minLength(2)])

    });
    this.subscription.push(this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['id'] != null;
          this.product = this.route.snapshot.data.pageData.product;
          this.availableCategories = this.route.snapshot.data.pageData.availableCategories;
          this.initForm();
        }
      ));
  }


  private initForm() {
    let productName = '';
    let productUrl = '';
    let productDescription = '';

    if (this.editMode) {
      // can be improved
      const newavailableCategories: Category[] = this.availableCategories
        .map((elem: Category) => {
          if (this.product.$categories.find(e => e.$CategoryId === elem.$CategoryId)) {
            elem.$checked = true;
          }
          return elem;
        })
      this.product = new Product(this.product.$id).addDescription(this.product.$description)
        .addName(this.product.$name)
        .addUrl(this.product.$url)
        .addCategories(newavailableCategories);

      productName = this.product.$name;
      productUrl = this.product.$url;
      productDescription = this.product.$description;



      this.productEditForm.setValue({
        name: productName,
        url: productUrl,
        description: productDescription
      });

    } else {
      this.product = new Product().addCategories(this.availableCategories);
    }

  }

  checkBoxHandler(index: number) {
    this.product.$categories[index].$checked = !this.product.$categories[index].$checked;
  }

  onSubmit() {
    const payLoad = {
      Name: this.productEditForm.get('name').value,
      Url: this.productEditForm.get('url').value,
      Description: this.productEditForm.get('description').value,
      CategoryIds: this.product.$categories.filter(elem => elem.$checked).map(elem => elem.$CategoryId)
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        "reload": "true"
      }
    };

    if (this.editMode) {
      this.subscription.push(this.productService.update(this.product.$id, payLoad)
        .subscribe((resp) => {
          if (resp.success) {
            this.router.navigate(['/products', this.product.$id], navigationExtras);
          } else {
            // show toast
          }
        }));
    } else {
      this.subscription.push(this.productService.save(payLoad)
        .subscribe((resp) => {
          if (resp.success) {
            this.router.navigate(['/products'], navigationExtras);
          }
        }));
    }

  }

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe);
  }

  onCancel() {
    this.router.navigate(['/products', this.product.$id]);
  }

}
