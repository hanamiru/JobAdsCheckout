import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Privilege } from '../privilege.model';
import { Product } from '../product.model';

@Component({
    selector: 'customer-component',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css', '/../app.component.css']
})

export class CustomerComponent {
    customerName: string = "";
    privileges: Privilege[] = [];
    products: Product[] = [];
    entitledPrivilege: Privilege;

    proceed: boolean = false;

    //Product data//
    prod_classic: Product = { id: "classic", name: "Classic Ad", price: 269.99 };
    prod_standout: Product = { id: "standout", name: "Standout Ad", price: 322.99 };
    prod_premium: Product = { id: "premium", name: "Premium Ad", price: 394.99 };

    //Privilege data//
    unilever: Privilege =
    {
        customer: "unilever",
        privilegeDescrip: ["Get a 3-for-2 deal on Classic Ads."],
        privileges: []
    };
    apple: Privilege =
    {
        customer: "apple",
        privilegeDescrip: ["Get a discount on Standout Ads for $299.99 per ad. (Original price: $322.99)"],
        privileges: []
    }; 

    ngOnInit() {
        this.products.push(this.prod_classic);
        this.products.push(this.prod_standout);
        this.products.push(this.prod_premium);

        this.privileges.push(this.unilever);
        this.privileges.push(this.apple);
    }

    ////PRIVILEGES//
    //aForBDeal(product: Product): void {
    //    var productAmount = this.cart.filter(x => x.id == product.id).length;
    //    if (productAmount % 3 > 0) {
    //        var discountedAmount = (product.price * 2) - (product.price * 3);
    //        discountedAmount *= productAmount;
    //        this.totalPrice -= discountedAmount;
    //    } else {
    //        //do nothing
    //    }
    //}

    //discountPerItemDeal(product: Product, discountPrice: number): void {
    //    var productAmount = this.cart.filter(x => x.id == product.id).length;
    //    var discountedAmount = discountPrice - product.price;
    //    discountedAmount *= productAmount;
    //    this.totalPrice -= discountedAmount;
    //}

    //discountWhen4OrMore(product: Product, discountPrice: number, cart: Product[]): void {
    //    var productAmount = cart.filter(x => x.id == product.id).length;
    //    if (productAmount >= 4) {
    //        var discountedAmount = discountPrice - product.price;
    //        discountedAmount *= productAmount;
    //        this.totalPrice -= discountedAmount;
    //    } else {
    //        //do nothing
    //    }
    //}

    proceedToCart(): void {
        //check customer's name and eligibility for privileges
        if (this.customerName.trim().length == 0) {
            alert("Please enter a customer name.");
        } else {
            for (var i of this.privileges) {
                if (i.customer == this.customerName.toLocaleLowerCase()) {
                    this.entitledPrivilege = i;
                    break;
                }
            }
            this.proceed = true;
        }  
    }

    reset(): void {
        this.customerName = "";
        this.proceed = false;
        this.entitledPrivilege = null;
    }
}