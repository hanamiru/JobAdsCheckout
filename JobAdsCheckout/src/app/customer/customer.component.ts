﻿import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Privilege } from '../privilege.model';
import { Product } from '../product.model';
import { CheckoutService } from '../checkout.service';

@Component({
    selector: 'customer-component',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css', '/../app.component.css'],
    providers: [CheckoutService]
})

export class CustomerComponent {
    customerName: string = "";
    entitledPrivilege: Privilege;
    proceed: boolean = false;
    errorMessage: string;

    constructor(private _checkoutService: CheckoutService) {}

    proceedToCart(): void {
        //check customer's name and eligibility for privileges
        if (this.customerName.trim().length == 0 || !isNaN(parseInt(this.customerName)) || /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(this.customerName)) {
            alert("Please enter a customer name.");
        } else {
            this.getPrivilege(this.customerName);
        }  
    }

    //retrieves any entitled privilege, given the customer's name
    getPrivilege(customerName: string) {
        this._checkoutService.getPrivilege(customerName.toLocaleLowerCase())
            .subscribe(privilege => this.entitledPrivilege = privilege,
            error => this.errorMessage = error,
            () => { this.proceed = true; } //proceed to cart
            );
    }

    reset(): void {
        this.customerName = "";
        this.proceed = false;
        this.entitledPrivilege = null;
    }
}