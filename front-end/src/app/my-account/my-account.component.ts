import { Component, OnInit } from '@angular/core';
import orderBidding from '../types/orderBidding';
import { MyServiceService } from '../my-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import AddProduct from '../types/addProduct';
import UpdateUser from '../types/updateUser';
import Product from '../types/product';
import returnedUserOrderBidding from '../types/returnedUserOrderBidding';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared-service.service';
import myAccountUser from '../types/myAccountUser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  constructor(
    private myService: MyServiceService,
    private sharedService: SharedService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  private userIdSubscribtions: Subscription[] = [];

  userPorducts: Product[] = [];
  storedUserId: number = 0;
  orderBiddings: returnedUserOrderBidding[] = [];
  retrievedUserData: myAccountUser = {
    fullname: '',
    email: '',
  };

  public addProduct = new FormGroup({
    productName: new FormControl<string>('', [Validators.required]),
    imageUrl: new FormControl<string>('', [Validators.required]),
    initialPrice: new FormControl<number>(0, [Validators.required]),
    startDate: new FormControl<Date>(new Date(), [Validators.required]),
    endDate: new FormControl<Date>(new Date(), [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
  });

  public updateUser = new FormGroup({
    updatedFullname: new FormControl<string>('', [Validators.required]),
    updatedEmail: new FormControl<string>('', [Validators.required]),
  });

  populateForm(user: myAccountUser) {
    this.updateUser.patchValue({
      updatedFullname: user.fullname,
      updatedEmail: user.email,
    });
  }

  updateProfile(event: Event) {
    event.preventDefault();
    let _sub = this.sharedService.userId$.subscribe((userIdValue) => {
      if (userIdValue) {
        const updatedUser: UpdateUser = {
          id: userIdValue,
          fullname: this.updateUser.value.updatedFullname || '',
          email: this.updateUser.value.updatedEmail || '',
        };

        // this.myService.getUser

        this.myService.updateUser(updatedUser).subscribe(
          (data) => {
            if (data) {
              alert('User Successfully Updated!');
              this.updateUser.reset();
            } else {
              alert('Try Again!');
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    this.userIdSubscribtions.push(_sub);
  }

  getOrderBidding(userId: number) {
    const statusCalc = (endDate: Date, didWin: Boolean) => {
      const now = new Date();
      if (endDate.getTime() - now.getTime() > 0) {
        return 'Pending';
      } else {
        return didWin ? 'Approved' : 'Rejected';
      }
    };

    this.myService.getUserOrderBidding(userId).subscribe((userBiddings) => {
      userBiddings.forEach((bid: orderBidding) => {
        const userOrderBidding = {
          img: bid.product.imgUrl,
          biddingId: bid.biddingId,
          price: bid.price,
          status: statusCalc(new Date(bid.product.endDate), bid.didWin),
        };
        this.orderBiddings.push(userOrderBidding);
      });
    });
  }

  addProductValue(event: Event) {
    event.preventDefault();
    const productData: AddProduct = {
      title: this.addProduct.value.productName || '',
      category: '',
      imgUrl: this.addProduct.value.imageUrl || '',
      initialPrice: this.addProduct.value.initialPrice || 0,
      startDate: this.addProduct.value.startDate || new Date(),
      endDate: this.addProduct.value.endDate || new Date(),
      description: this.addProduct.value.description || '',
      userId: this.storedUserId,
    };

    if (
      productData.title.trim() === '' ||
      productData.imgUrl.trim() === '' ||
      productData.description.trim() === ''
    ) {
      alert('Please Enter Valid data.');
      return;
    }

    if (
      new Date(productData.startDate).getTime() -
        new Date(productData.endDate).getTime() >=
      0
    ) {
      alert('Please Enter valid start date and end date.');
      return;
    }

    if (+productData.initialPrice < 0) {
      alert('Please Enter valid initlial price.');
      return;
    }

    let _sub = this.sharedService.userId$.subscribe((userIdValue) => {
      if (userIdValue) {
        this.myService
          .addProduct({ ...productData, userId: userIdValue })
          .subscribe(
            (data) => {
              if (data) {
                this.addProduct.reset();
                alert('Product Added Successfully');
                window.location.reload();
              } else {
                this.addProduct.reset();
                alert('Please Try Again!');
              }
            },
            (error) => {
              console.log(error);
              if (error) {
                alert(error);
              }
            }
          );
      }
    });
    this.userIdSubscribtions.push(_sub);
  }

  ngOnInit(): void {
    let _sub = this.sharedService.userId$.subscribe((userIdValue) => {
      if (userIdValue) {
        this.myService.getMyAccountUserById(userIdValue).subscribe((user) => {
          if (user) {
            this.populateForm(user);
            this.retrievedUserData.email = user.email;
            this.retrievedUserData.fullname = user.fullname;
          }
        });

        this.myService
          .getUserProducts(userIdValue)
          .subscribe((_userProducts) => {
            this.userPorducts = _userProducts;
          });
        this.getOrderBidding(userIdValue);
      }
    });
    this.userIdSubscribtions.push(_sub);
  }

  logout(event: Event) {
    event.preventDefault();
    this.localStorage.removeItem('userId');
    this.sharedService.setUserId(-1);
    this.router.navigate(['/']);
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  div1Visible: boolean = true;
  div2Visible: boolean = false;
  div3Visible: boolean = false;
  div4Visible: boolean = false;
  div5Visible: boolean = false;

  toggleDiv(divNumber: number) {
    this.div1Visible = divNumber === 1;
    this.div2Visible = divNumber === 2;
    this.div3Visible = divNumber === 3;
    this.div4Visible = divNumber === 4;
    this.div5Visible = divNumber === 5;
  }

  ngOnDestroy() {
    this.userIdSubscribtions.forEach((userIdSub) => {
      if (userIdSub) {
        userIdSub.unsubscribe();
      }
    });
  }
}
