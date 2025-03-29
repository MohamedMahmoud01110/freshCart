import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NotFoundComponent } from './core/auth/components/not-found/not-found.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { isLoggedGuard } from './core/guards/is-logged.guard';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { BrandListComponent } from './features/brands/components/brand-list/brand-list.component';
import { CartListComponent } from './features/cart/components/cart-list/cart-list.component';
import { CategoryComponent } from './features/category/components/category/category.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { ProductDetailsComponent } from './features/product/components/product-details/product-details.component';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { CheckoutComponent } from './features/orders/components/checkout/checkout.component';
import { OrdersComponent } from './features/orders/components/orders/orders.component';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, canActivate:[isLoggedGuard] , children: [
    {path: 'login', component: LoginComponent, title:'FreshCart - Login'},
    {path: 'register', component: RegisterComponent, title:'FreshCart - Register'},
  ]
  },
  {path:'', component: MainLayoutComponent, canActivate:[authGuard], children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HomeComponent,title:'FreshCart - Home'},
    {path:'categories',component:CategoryComponent ,title:'FreshCart - Categories'},
    {path:'products',component:ProductListComponent ,title:'FreshCart - Products'},
    {path:'product-details/:id',component:ProductDetailsComponent ,title:'FreshCart - Product Details'},
    {path:'brands',component:BrandListComponent ,title:'FreshCart - Brands'},
    {path:'cart',component:CartListComponent ,title:'FreshCart - Cart'},
    {path: 'checkout/:id',component:CheckoutComponent, title:'FreshCart - Checkout'},
    {path:'allorders',component:OrdersComponent ,title:'FreshCart - All Orders'},
  ]},
  {path: '**', component: NotFoundComponent}
];
