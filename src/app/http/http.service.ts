/**
 * imports HttpClient which performs http requests
 */
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
/**
 * isDevMode Returns whether Angular is in development mode. After called once, the value is locked and won't change any more.
 */
import { Injector, isDevMode } from '@angular/core';

import { Observable, of, Subscriber } from 'rxjs';
/**
 * An NgModule that provides navigation and URL manipulation capabilities.
 */
import { Router } from '@angular/router';
/**
 * imports environment to get web server url
 */
import { environment } from 'src/environments/environment';
import { ResponseSchema } from './response-schema.model';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    static readonly defaultErrorResponse: ResponseSchema = { error: true, message: 'Technical Error! Please try again later', data: [] };
    /**
     * baseURL is a string variable contains web-server url "http//localhost:3000/api"
     */
    baseURL = environment.url;

    /**
     * variable of type HttpClient to get/save injected HttpClient.
     * used to send Http requests
     */
    private http: HttpClient;

    /**
     * variable of type Router to get/save injected Router.
     * An NgModule that provides navigation and URL manipulation capabilities.
     */
    private router: Router;
    /**
     * Creates an instance of HttpService
     * @param injector  is responsible for creating service instances and injecting them into other classes
     */
    constructor(injector: Injector) {
        this.http = injector.get(HttpClient);
        this.router = injector.get(Router);
    }

    get(url: string, options = {}): Observable<any> {
        return this.http.get(this.baseURL + url, options).pipe(tap((response: any) => { }),
            catchError(this.handleError<any>(this.getFunctionName(), HttpService.defaultErrorResponse)));
    }

    post(url: string, options = {}): Observable<any> {
        return this.http.post(this.baseURL + url, options).pipe(tap((response: any) => { }),
            catchError(this.handleError<any>(this.getFunctionName(), HttpService.defaultErrorResponse)));
    }

    put(url: string, options = {}): Observable<any> {
        return this.http.put(this.baseURL + url, options).pipe(tap((response: any) => { }),
            catchError(this.handleError<any>(this.getFunctionName())));
    }

    patch(url: string, options = {}): Observable<any> {
        return this.http.patch(this.baseURL + url, options).pipe(tap((response: any) => { }),
            catchError(this.handleError<any>(this.getFunctionName())));
    }

    /**
     * returns error function to catchError
     */
    getFunctionName(): string {
        if (new Error().stack) {
            return new Error().stack.split('\n')[3].trim();
        } else {
            return new Error().stack;
        }
    }


    public handleError<T>(operation = 'operation', result?: T) {
        return (event: any): Observable<T> => {

            // If data is null, use the data from the error response
            if (!result && event.error) {
                result = event.error;
            }
            // In development mode, printing log error
            this.onDevMode(event, operation);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** print error to console if the environment is dev */
    onDevMode(event, operation: string) {
        /** print error to console if the environment is dev */
        if (isDevMode()) {
            console.error(event.error); // log to console instead
            console.log(`${operation} failed: ${event.message}`);
        }

    }
}
