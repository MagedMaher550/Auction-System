import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowseProductsComponent } from './browse-products/browse-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'auth/myaccount',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    component: BrowseProductsComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
