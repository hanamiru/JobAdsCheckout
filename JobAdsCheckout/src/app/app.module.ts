import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { CartComponent } from './customer/cart/cart.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent, CustomerComponent, CartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
