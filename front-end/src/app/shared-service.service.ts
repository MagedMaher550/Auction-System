import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import Product from './types/product';
import { MyServiceService } from './my-service.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private myService: MyServiceService,
    private localStorage: LocalStorageService
  ) {
    this.setRenderedProductsDefault();
    this.setUserIdDefault();
  }

  private renderedProducts = new BehaviorSubject<Product[]>([]);
  public allProducts$ = this.renderedProducts.asObservable();

  private userId = new BehaviorSubject<number | null>(null);
  public userId$ = this.userId.asObservable();

  setRenderedProductsDefault() {
    this.myService.getAllActiveProducts().subscribe(
      (data) => {
        this.renderedProducts.next(data);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  setUserIdDefault() {
    const userId = this.localStorage.getItem('userId');
    this.userId.next(userId ? +userId : -1);
  }

  setAllProducts(products: Product[]) {
    this.renderedProducts.next(products);
  }

  setUserId(userId: number) {
    this.userId.next(userId);
  }

  async getUserId(): Promise<number | null> {
    console.log("ss GOT 1");
    console.log("ss GOT 1");
    console.log("ss GOT 1");
    const userIdValue = await this.userId$
    .pipe(map((userId) => userId ?? null))
    .toPromise();
    console.log("ss GOT 2");
    console.log("ss GOT 2");
    console.log("ss GOT 2");

    return userIdValue !== undefined ? userIdValue : null;
  }
}
