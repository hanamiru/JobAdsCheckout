import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../product.model';
import { Privilege } from '../../privilege.model';

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent {
    @Input() entitledPrivilege: Privilege;
    @Input() products: Product[];
    cart: Product[] = [];
    selectedItem: Product;
    totalPrice: number = 0;

    addToCart(): void {
        //add selected item to cart List
        this.cart.push(this.selectedItem);
        this.totalPrice += this.selectedItem.price;
    }

    removeFromCart(event: any): void {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var id = idAttr.nodeValue;
        var itemPrice = this.cart[id].price;
        this.cart.splice(id, 1);
        this.totalPrice -= itemPrice;
    }

    clearCart(): void {
        this.cart = [];
        this.selectedItem = null;
        this.totalPrice = 0;
    }
}