import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Product from '../types/product';
import { SharedService } from '../shared-service.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private myService: MyServiceService,
    private sharedSerive: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  productId: string = '0';
  private userIdSubscription: Subscription = new Subscription();

  public editProduct = new FormGroup({
    productName: new FormControl<string>('', [Validators.required]),
    imageUrl: new FormControl<string>('', [Validators.required]),
    initialPrice: new FormControl<number>(0, [Validators.required]),
    startDate: new FormControl<string>('', [Validators.required]),
    endDate: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  populateForm(product: Product) {
    this.editProduct.patchValue({
      productName: product.title,
      imageUrl: product.imgUrl,
      initialPrice: product.initialPrice,
      startDate: this.formatDate(product.startDate + ''),
      endDate: this.formatDate(product.endDate + ''),
      description: product.description,
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const _productId: string = params['id'];
      this.productId = _productId;

      this.myService.getProductById(_productId).subscribe(
        (product) => {
          this.populateForm(product);
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    });
  }

  updateProduct(event: Event) {
    event.preventDefault();
    this.userIdSubscription = this.sharedSerive.userId$.subscribe(
      (userIdValue) => {
        if (userIdValue) {
          const updatedProduct: Product = {
            id: +this.productId,
            title: this.editProduct.value.productName || '',
            imgUrl: this.editProduct.value.imageUrl || '',
            initialPrice: this.editProduct.value.initialPrice || 0,
            startDate:
              new Date(this.editProduct.value.startDate || '') || new Date(),
            endDate:
              new Date(this.editProduct.value.endDate || '') || new Date(),
            description: this.editProduct.value.description || '',
            userId: userIdValue,
          };

          if (
            updatedProduct.title.trim() === '' ||
            updatedProduct.imgUrl.trim() === '' ||
            updatedProduct.description.trim() === ''
          ) {
            alert('Please Enter Valid data.');
            return;
          }

          if (
            new Date(updatedProduct.startDate).getTime() -
              new Date(updatedProduct.endDate).getTime() >=
            0
          ) {
            alert('Please Enter valid start date and end date.');
            return;
          }

          if (+updatedProduct.initialPrice < 0) {
            alert('Please Enter valid initlial price.');
            return;
          }
          this.myService.updateProduct(updatedProduct).subscribe(
            (data) => {
              if (data) {
                alert('Product Updated Successfully!');
                this.router
                  .navigate([`/products/${this.productId}`])
                  .then(() => window.location.reload());
              } else {
                alert("Something went wrong, Can't update the product!");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log('userIdValue is null in edit-product');
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
