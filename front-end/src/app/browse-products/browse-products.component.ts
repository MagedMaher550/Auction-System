import { Component, OnInit } from '@angular/core';
import Product from '../types/product';
import { SharedService } from '../shared-service.service';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-products',
  templateUrl: './browse-products.component.html',
  styleUrls: ['./browse-products.component.css'],
})
export class BrowseProductsComponent implements OnInit {
  productsData: Product[] = [];
  constructor(
    private sharedServices: SharedService,
    private mySerivce: MyServiceService,
    private router: Router
  ) {}

  sortPriceAsc(event: Event) {
    this.mySerivce.sortPriceAsc().subscribe((data) => {
      this.sharedServices.setAllProducts(data);
    });
  }
  sortPriceDesc(event: Event) {
    this.mySerivce.sortPriceDesc().subscribe((data) => {
      this.sharedServices.setAllProducts(data);
    });
  }
  sortNameAsc(event: Event) {
    this.mySerivce.sortNameAsc().subscribe((data) => {
      this.sharedServices.setAllProducts(data);
    });
  }
  sortNameDesc(event: Event) {
    this.mySerivce.sortNameDesc().subscribe((data) => {
      this.sharedServices.setAllProducts(data);
    });
  }

  ngOnInit(): void {
    this.sharedServices.allProducts$.subscribe((data) => {
      this.productsData = data;
    });
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
