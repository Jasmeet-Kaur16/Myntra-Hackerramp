import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './customer/home/home.component';
import { CartComponent } from './customer/cart/cart.component';
import { AboutUsComponent } from './customer/about-us/about-us.component';
import { ShopComponent } from './customer/shop/shop.component';
import { LayoutComponent } from './customer/layout/layout.component';
import { HeaderComponent } from './customer/layout/header/header.component';
import { FooterComponent } from './customer/layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './customer/register/register.component';
import { LoginComponent } from './login/login.component';
import { MenwearComponent } from './customer/menwear/menwear.component';
import { WomenwearComponent } from './customer/womenwear/womenwear.component';
import { TrendsComponent } from './customer/trends/trends.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    AboutUsComponent,
    ShopComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    MenwearComponent,
    WomenwearComponent,
    TrendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
