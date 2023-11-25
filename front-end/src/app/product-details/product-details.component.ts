import { Component, Input, OnInit } from '@angular/core';
import biddingHistory from '../types/bidingHistory';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import Product from '../types/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { SharedService } from '../shared-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mySerivce: MyServiceService,
    private localStorage: LocalStorageService,
    private sharedService: SharedService
  ) {}

  hasBiddingStarted: boolean = true;

  @Input() isUserOwnProduct: boolean = false;

  BiddingHistoryForDisplay: biddingHistory[] = [];
  private userIdSubscribtions: Subscription[] = [];

  public addBidding = new FormGroup({
    biddingValue: new FormControl<string>('', [Validators.required]),
  });

  productDetails: Product = {
    id: 0,
    title: '',
    imgUrl: '',
    initialPrice: 0,
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    userId: 0,
  };

  isBiddingAvailable: boolean = true;
  produtHighestPrice: number = this.productDetails.initialPrice;

  addBiddingValue(event: Event) {
    event.preventDefault();
    const biddingValue: number = +(this.addBidding.value.biddingValue || '0');

    if (biddingValue <= this.produtHighestPrice) {
      alert(`Please Add a price greater than: ${this.produtHighestPrice}`);
      return;
    } else if (
      new Date(this.productDetails.endDate).getTime() - new Date().getTime() <=
      0
    ) {
      this.isBiddingAvailable = false;
      alert('Sorry, bidding has ended!');
      return;
    } else {
      let _sub = this.sharedService.userId$.subscribe((userIdValue) => {
        if (userIdValue) {
          this.mySerivce
            .addBidding(biddingValue, this.productDetails.id, userIdValue)
            .subscribe((data) => {
              if (data) {
                this.produtHighestPrice = biddingValue;
                this.addBidding.reset();
                this.getBiddingHistory(this.productDetails.id);
              }
            });
        } else {
          this.router.navigate(['/auth/login']);
        }
      });
      this.userIdSubscribtions.push(_sub);
    }
  }

  threeActiveProducts: Product[] = [];
  getBiddingHistory(productId: number) {
    this.BiddingHistoryForDisplay = [];
    this.mySerivce
      .getBiddingHistory(+productId)
      .subscribe((biddingHistoryList) => {
        biddingHistoryList.forEach((bh) => {
          this.BiddingHistoryForDisplay.push({
            imageUrl:
              'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgGCgkGBwoHBwYGBg8UFQYWIB0WIhURHxMYHSggGBolGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QANBABAQACAAMGAgYLAQAAAAAAAAIBAwQREiEiMTJSYhNyBTNTgqHBI0FCUWFxgZGSk7EU/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6oAqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8qpic1WcYmfNVM/fxV3nOIzmY/GwXNvEa9XZVc6+znxVb4+s57kTj5u1UAWP/bu/fH+t1PHbMeM6s/d5KoC/HHRnzxc/L2rWM4zjGceFMZJp33pz3c85+zrwBrDjVsnbGKn70+h2AAAAAAAAAAAAAAABnPLGc58J7wM/j9ma2/D59kT5f4qr26zV5rPjVdTxQAAAAABZ4C8zu6OfZctFkaKzO/XnHrlroAAAAAAAAAAAAAACPfnlo2fJSRHvxz0bMeygZICgAAAAADqM9NzXpqabDFbWPBAAAAAAAAAAAAAAARb9k69ec3z5V3e6lVuPxz0Yz6bkGcAoAAAAAA9xy545+DW1XOyMXPVyr1Mhp8Hjlw8e7qr8UE4AAAAAAAAAAAAACHip6+HvHpnq/smeVOKnM58KnpoGMJeI0fAqcdXVivL3USgAAAAAA19U9GqJ9MqHDcN8bHVnPKZr/JpIAAAAAAAAAAAAAAAAKv0hHVqm8fsV/wBZ7ZqcXOZrwqemmTu151bMxnt6fLXqwDgBQAABJw+v4u3E58vmr+QL/CR0aJxnxr9JX9U4IAAAAAAAAAAAAAAAADP+kfrp+T8167iJ53Uzj3MzitmNu3qnyzPTIIgFAABa+jvrq+T81VNwuzGrdiq8tT00DUHMXFzzisVj2ukAAAAAAAAAAAAAEezdr1+e5xn0z25BI52XGueq6xjClt47OeeNU8vdStV1ddVVnOfVQGy6u81Wc573d6nIKAAAAAAOtd1F4qc5x3u90tbXcbJ6orGcMd1N1FdU1nGfVKDYFDVx2ccsbZ5+6VvXu17PJc5z6a7MgkAAAAAABDxO74Mc8dt13YkHW3dGrHO6+WZ8aVL4+s/VxOPds7VWqq6zVZznNeaqeAkviNt+a88vTPYjBQAAAAAAAAAAAAABJHEbY8t55emu1PHH1j6yJz7tfYqANbVujbjnFfNNeMpGNNVFYqc5xmfLUtPht3xo557Lnu3KCYABm8dWa35x+qJmQBXAUAAAAAAAAAAAAAAAAAAFjgazO/GP1XNSCDSAB//Z',
            name: '',
            price: bh.price,
            userId: bh.userId,
          });
        });
        this.BiddingHistoryForDisplay.forEach((bh) => {
          this.mySerivce.getUserById(bh.userId).subscribe((user) => {
            bh.name = user.fullname;
          });
        });
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId: string = params['id'];
      this.getBiddingHistory(+productId);
      this.mySerivce.GetThreeActiveProducts().subscribe((data) => {
        this.threeActiveProducts = data;
      });

      this.mySerivce.GetHighestPriceForProduct(productId).subscribe(
        (data) => {
          this.produtHighestPrice = data;
        },
        (error) => {
          console.log(error);
        }
      );

      let _sub = this.sharedService.userId$.subscribe((userIdValue) => {
        if (userIdValue) {
          this.mySerivce.getProductById(productId).subscribe(
            (data) => {
              this.productDetails = data;
              if (
                new Date(data.endDate).getTime() - new Date().getTime() <=
                0
              ) {
                this.isBiddingAvailable = false;
              }
              if (data.userId === userIdValue) {
                this.isUserOwnProduct = true;
              }
              if (
                new Date().getTime() - new Date(data.startDate).getTime() <
                0
              ) {
                this.hasBiddingStarted = false;
              }
            },
            (error) => {
              console.error('Error fetching data', error);
            }
          );
        } else {
          this.router.navigate(['/auth/login']);
        }
      });
      this.userIdSubscribtions.push(_sub);
    });
  }

  deleteProduct(event: Event) {
    event.preventDefault();
    this.mySerivce.deleteProduct(this.productDetails.id).subscribe(
      (data) => {
        if (data) {
          alert('Product Deleted Successfully!');
          this.router
            .navigate(['/products'])
            .then(() => window.location.reload());
        } else {
          alert("Something went wrong, can't delete this product!");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToEdit(event: Event) {
    event.preventDefault();
    this.router.navigate([`edit-product/${this.productDetails.id}`]);
  }

  div1Visible: boolean = true;
  div2Visible: boolean = false;
  div3Visible: boolean = false;

  toggleDiv(divNumber: number) {
    this.div1Visible = divNumber === 1;
    this.div2Visible = divNumber === 2;
    this.div3Visible = divNumber === 3;
  }

  ngOnDestroy() {
    this.userIdSubscribtions.forEach((userIdSub) => {
      if (userIdSub) {
        userIdSub.unsubscribe();
      }
    });
  }
}
