// my-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import Product from './types/product';
import biddingHistory from './types/bidingHistory';
import User from './types/User';
import AddProduct from './types/addProduct';
import AddUser from './types/addUser';
import UpdateUser from './types/updateUser';
import LoginCredentials from './types/LoginCredentials';
import myAccountUser from './types/myAccountUser';

@Injectable({ providedIn: 'root' })
export class MyServiceService {
  private apiUrl = 'https://localhost:7215/api';

  constructor(private http: HttpClient) {}
  getEightActiveProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/Product/GetEightActiveProducts`);
  }

  getUpcomingProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/Product/GetUpcomingProducts`);
  }

  getAllActiveProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/Product/GetAllActiveProducts`);
  }

  sortPriceAsc(): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsPriceSortedAsc`
    );
  }

  sortPriceDesc(): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsPriceSortedDesc`
    );
  }

  sortNameAsc(): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsNameSortedAsc`
    );
  }

  sortNameDesc(): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsNameSortedDesc`
    );
  }

  getSearchResults(searchQuery: string): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductsFromSearch?query=${searchQuery}`
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetProductById?productId=${productId}`
    );
  }

  GetHighestPriceForProduct(productId: string): Observable<number> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetHighestPriceForProduct?productId=${productId}`
    );
  }

  addBidding(
    biddingValue: number,
    productId: number,
    userId: number
  ): Observable<boolean> {
    const requestBody = {
      price: biddingValue,
      productId: productId,
      userId: userId,
      date: new Date(),
    };

    return this.http
      .post<void>(`${this.apiUrl}/Bidding/AddBidding`, requestBody)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  GetThreeActiveProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/Product/GetThreeActiveProducts`);
  }

  getBiddingHistory(productId: number): Observable<biddingHistory[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Bidding/GetBiddingHistoryPerProduct?productId=${productId}`
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/User?userId=${userId}`);
  }

  getMyAccountUserById(userId: number): Observable<myAccountUser> {
    return this.http.get<any>(`${this.apiUrl}/User?userId=${userId}`);
  }
  
  addProduct(product: AddProduct): Observable<any> {
    return this.http
      .post<HttpResponse<void>>(`${this.apiUrl}/Product/AddProduct`, product, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<HttpResponse<void>>) => {
          if (response.status === 201) {
            return response;
          }
          return of(404);
        }),
        catchError((error) => {
          return throwError(error.status);
        })
      );
  }

  updateUser(user: UpdateUser): Observable<boolean> {
    return this.http.put<void>(`${this.apiUrl}/User`, user).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  getUserProducts(userId: number): Observable<Product[]> {
    return this.http.get<any>(
      `${this.apiUrl}/Product/GetUserProducts?userId=${userId}`
    );
  }

  getUserOrderBidding(userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/Bidding/GetUserBidding?userId=${userId}`
    );
  }

  deleteProduct(productId: number): Observable<boolean> {
    return this.http
      .delete<void>(
        `${this.apiUrl}/Product/DeleteProduct?productId=${productId}`
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  updateProduct(updatedProduct: Product): Observable<boolean> {
    return this.http
      .put<void>(`${this.apiUrl}/Product/UpdateProduct`, updatedProduct)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  register(user: AddUser): Observable<any> {
    return this.http
      .post<void>(`${this.apiUrl}/User`, user, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<void>) => {
          if (response.status === 201) {
            return response;
          }
          return 404;
        }),
        catchError((error) => {
          return throwError(error.status);
        })
      );
  }

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.http
      .post<void>(`${this.apiUrl}/User/login`, loginCredentials, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<void>) => {
          if (response.status === 201) {
            return response;
          }
          return 404;
        }),
        catchError((error) => {
          return throwError(error.status);
        })
      );
  }
}
