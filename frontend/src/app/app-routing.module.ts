import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './customer/home/home.component';
import { ShopComponent } from './customer/shop/shop.component';
import { CartComponent } from './customer/cart/cart.component';
import { AboutUsComponent } from './customer/about-us/about-us.component';
import { LayoutComponent } from './customer/layout/layout.component';
import { RegisterComponent } from './customer/register/register.component';
import { LoginComponent } from './login/login.component';
import { MenwearComponent } from './customer/menwear/menwear.component';
import { WomenwearComponent } from './customer/womenwear/womenwear.component';
import { TrendsComponent } from './customer/trends/trends.component';
const routes: Routes = [
  { path:'', redirectTo:'customer/home',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  
  {
    path:'customer',component:LayoutComponent,
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'menswear', component: MenwearComponent },
      { path: 'cart', component: CartComponent },
      { path: 'womenswear', component: WomenwearComponent },
      { path: 'trends', component: TrendsComponent },
    ],
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
