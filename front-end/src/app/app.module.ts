import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomInputComponent } from './input-field/input-field.component';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './card/card.component';
import { BrowseProductsComponent } from './browse-products/browse-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BidingHistoryItem } from './bidding-history-item/bidding-history-item.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CustomInputComponent,
    SignupComponent,
    CardComponent,
    BrowseProductsComponent,
    AboutUsComponent,
    ProductDetailsComponent,
    BidingHistoryItem,
    MyAccountComponent,
    EditProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
