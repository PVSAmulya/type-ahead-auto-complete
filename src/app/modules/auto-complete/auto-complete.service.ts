
import { Injector } from '@angular/core';
/** imports HttpService to send http requests */
import { HttpService } from './../../http/http.service';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AutoCompleteService extends HttpService {
    constructor(injector: Injector) {
        // injector to access parent constructor HttpService
        super(injector);
    }
    getData(options) {
        return this.get(options);
    }

}
