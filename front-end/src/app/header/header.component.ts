import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { SharedService } from '../shared-service.service';
import { LocalStorageService } from '../local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private mySerivce: MyServiceService,
    private sharedServices: SharedService,
    private localStorage: LocalStorageService
  ) {}

  isLoggedIn: boolean = false;
  private userIdSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.userIdSubscription = this.sharedServices.userId$.subscribe(
      (userIdValue) => {
        this.isLoggedIn = userIdValue !== -1;
      }
    );
  }

  public search = new FormGroup({
    searchQuery: new FormControl<string>('', [Validators.required]),
  });

  browseProducts(event: Event) {
    this.mySerivce.getAllActiveProducts().subscribe(
      (activeProducts) => {
        this.sharedServices.setAllProducts(activeProducts);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  getSearchResults(event: Event) {
    event.preventDefault();
    const searchQuery: string = this.search.value.searchQuery || '';
    this.mySerivce.getSearchResults(searchQuery).subscribe((data) => {
      this.sharedServices.setAllProducts(data);
      this.search.reset();
      this.router.navigate(['/products'], { queryParams: { q: searchQuery } });
    });
  }

  ngOnDestroy() {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
