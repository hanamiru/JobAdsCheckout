import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
    name = 'Angular';
    customerName: string = "";
    items: string[] = ["Classic", "Standard", "Premium"];
    cart: string[] = [];
    selectedItem: string;

    addToCart(): void {
        //add selected item to cart List
        this.cart.push(this.selectedItem);
    }
}
