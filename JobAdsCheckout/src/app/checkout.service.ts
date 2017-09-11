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

@Injectable()
export class CheckoutService {
    private _productUrl = '/src/api/products.json';
    private _privilegeUrl = '/src/api/privileges.json';
    private _offerUrl = '/src/api/offers.json';

    constructor(private _http: Http) { }

    // get a list of all products
    getAllProducts(): Observable<Product[]> {
        return this._http.get(this._productUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //get a list of all privileges
    getAllPrivileges(): Observable<Privilege[]> {
        return this._http.get(this._privilegeUrl)
            .map(res=> res.json())
            .catch(this.handleError);
    }

    //get a list of all existing offers
    getAllOffers(): Observable<Offer[]> {
        return this._http.get(this._offerUrl)
            .map(res => res.json())
            .catch(this.handleError);
    }

    //retrieve entitled privilege, given customer's name
    getPrivilege(customerName: string): Observable<Privilege> {        
        return this.getAllPrivileges()
            .map((allPrivileges: Privilege[]) => allPrivileges.find(p => p.customer == customerName));
    }

    //retrieve offer, given an offerid
    getOffer(offerid: string): Observable<Offer> {
        return this.getAllOffers()
            .map((allOffers: Offer[]) => allOffers.find(o => o.offerId == offerid));
    }

    //retrieve a list of offer (objects), given a list of offerids
    getEntitledOffers(offers: string[]): Offer[] {
        var descriptions: Offer[] = [];
        for (var offerId of offers) {
            this.getOffer(offerId)
                .subscribe(offer => { descriptions.push(offer)},
                error => console.log("ERROR: ", error)
            );
        }
        return descriptions;
    }

    //generate the quantity list, given a max number to generate
    generateAmountList(amount: number): number[] {
        var amountList: number[] = [];
        for (var i = 1; i <= amount; i++) {
            amountList.push(i);
        }
        return amountList;
    }

    //from Angular quickstart
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}