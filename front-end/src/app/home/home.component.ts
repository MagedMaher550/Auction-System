import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import Product from '../types/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fetchedEightActiveProducts: Product[] = [];
  fetchedUpcomingProducts: Product[] = [];
  constructor(private mySerivce: MyServiceService, private router: Router) {}

  ngOnInit(): void {
    this.mySerivce.getEightActiveProducts().subscribe(
      (data) => {
        this.fetchedEightActiveProducts = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    this.mySerivce.getUpcomingProducts().subscribe(
      (data) => {
        this.fetchedUpcomingProducts = data;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  navigateToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
