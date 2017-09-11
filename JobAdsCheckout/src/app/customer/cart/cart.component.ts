import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Product } from '../../product.model';
import { Privilege } from '../../privilege.model';
import { Offer } from '../../offer.model';
import { Cart } from '../../cart.model';
import { CheckoutService } from '../../checkout.service';
import { PrivilegesService } from '../../privileges.service';

declare var $: any;

@Component({
    selector: 'cart-component',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    providers: [CheckoutService, PrivilegesService]
})

export class CartComponent implements OnInit {
    @Input() entitledPrivilege: Privilege;
    offers: Offer[];
    products: Product[];
    quantityList: number[];
    shoppingCart: Cart[] = [];
    selectedProduct: Product;
    selectedAmount: number;
    totalPrice: number = 0;
    discountPrice: number = 0;
    QUANTITY_LIST = 50;


    constructor(
        private _checkoutService: CheckoutService,
        private _privilegesService: PrivilegesService
    ) { }

    ngOnInit() {
        this.getAllProducts();
        this.getAmountList(this.QUANTITY_LIST);
        if (this.entitledPrivilege) {
            this.getEntitledOffers(this.entitledPrivilege.offers);
        }
    }

    //retrieves a list of all products available
    getAllProducts() {
        this._checkoutService.getAllProducts()
            .subscribe(products => { this.products = products },
            error => console.log(error)
        );
    }

    //generates the quantity dropdown list, given an amount to be generated
    getAmountList(amount: number) {
        this.quantityList = this._checkoutService.generateAmountList(amount);
    }

    //retrieves all offers under a privilege
    getEntitledOffers(offers: string[]) {
        this.offers = this._checkoutService.getEntitledOffers(offers);
    }

    //add item to cart
    addToCart(): void {
        if (this.selectedProduct && this.selectedAmount > 0) { 
            var cartItem = this.shoppingCart.find(x => x.product == this.selectedProduct); //find product in cart
            if (cartItem) { //if product already existed in cart, increase the amount and subtotal
                cartItem.quantity += this.selectedAmount;
                cartItem.subtotal = cartItem.product.price * cartItem.quantity;
            } else { //add product to the cart
                var newItem = new Cart();
                newItem.product = this.selectedProduct;
                newItem.quantity = this.selectedAmount;
                newItem.subtotal = this.selectedProduct.price * this.selectedAmount;
                this.shoppingCart.push(newItem);
            }
            this.totalPrice += this.selectedProduct.price * this.selectedAmount; //calculate original total price
            this.getDiscount(); //discount price to be reduced from original price based on entitled privilege

        } else {
            alert("Please select at least an item to be added into a cart.")
        }
    }

    //calculate price to be discounted from the original price
    getDiscount() {
        this.discountPrice = 0;
        if (this.entitledPrivilege) {
            for (var offer of this.offers) { // for each offers entitles (eg: offer1, offer2..)
                var promoProduct = this.shoppingCart.find(x => x.product.productId == offer.promoProduct); //get promoProduct details
                if (promoProduct) {
                    var discount = this._privilegesService.getDiscount(offer, promoProduct.product, promoProduct.quantity);
                    this.discountPrice += discount; //deduct price based on entitled offers
                    promoProduct.subtotal = (promoProduct.product.price * promoProduct.quantity) - discount; // update subtotal
                }
            }
        } else {
            //do nothing
        }
    }

    //remove the product from cart
    removeFromCart(event: any): void {
        //get the parent Id of the button clicked
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var id = idAttr.nodeValue;

        var itemToRemove = this.shoppingCart[id];
        var itemPrice = itemToRemove.product.price * itemToRemove.quantity;
        this.totalPrice -= itemPrice;

        this.shoppingCart.splice(id, 1); //remove the item from list
        if (this.shoppingCart.length > 0) { //if cart still contain items
            this.getDiscount(); //recalculate discount
        } else {
            this.discountPrice = 0; //else reset value 
        }
    }

    checkout(data: any) {
        alert("Successfully checked out!");
        //var theJSON = JSON.stringify(data);
        //var uri = "data:application/json;charset=UTF-8," + encodeURIComponent(theJSON);
        //var a = document.createElement('a');
        //a.href = uri;
        //a.innerHTML = "Checkout Data";
        //alert("Checkout success! " + a);
    }

    clearCart(): void {
        this.shoppingCart = [];
        this.selectedProduct = null;
        this.selectedAmount = -1;
        this.totalPrice = 0;
        this.discountPrice = 0;
    }

}