import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Product } from './product.model';
import { Privilege } from './privilege.model';
import { Offer } from './offer.model';
import { Cart } from './cart.model';
declare var $: any;

@Injectable()
export class PrivilegesService {
    constructor(private _http: Http) { }

    //returns amount to be discounted from the original price
    getDiscount(offer: Offer, promoProduct: Product, quantity: number): number {
        return this[`${offer.offerType}`](promoProduct, quantity, offer.parameters); 
    }

    //========================
    //This is applied to every offer type below:-
    //INPUT:
    //  promoProduct - product involved in the offer
    //  quantity - amount of products in cart
    //  parameters - offer requirements
    //OUTPUT:
    //  price to be discounted from the original price
    //========================

    //A-for-B Deal: Get A amount of items for just the price of B amount
    typeA(promoProduct: Product, quantity: number, parameters: number[]): number {
        var A = parameters[0];
        var B = parameters[1];
        var discountedAmount = (promoProduct.price * A) - (promoProduct.price * B);
        return discountedAmount *= Math.floor(quantity / A);
    }

    //Discount per item deal: Product price drops to a certain price
    typeB(promoProduct: Product, quantity: number, parameters: number[]): number {
        var DISCOUNTED_PRICE = parameters[0];
        var discountedAmount = promoProduct.price - DISCOUNTED_PRICE;
        return discountedAmount *= quantity;
    }

    //Discount when more X or more amount of the product was bought
    typeC(promoProduct: Product, quantity: number, parameters: number[]): number {
        var MIN_AMOUNT = parameters[0];
        var DISCOUNTER_PRICE = parameters[1];

        var discountedAmount = 0;
        //var productAmount = cart.filter(x => x.productId == promoProduct.productId).length;
        if (quantity >= MIN_AMOUNT) {
            discountedAmount = promoProduct.price - DISCOUNTER_PRICE;
            discountedAmount *= quantity;
        } else {
            //do nothing
        }
        return discountedAmount;
    }

}