import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

/**
 * Creates an instance of HttpAuthInterceptor. Called when the class is instantiated
 * HttpAuthInterceptor is used to intercept login routes. Login requests does not required header to be attached. Therefore, using HttpAuthInterceptor to intercept the routes
 */
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor() { }
    /**
     * @param req outgoing request to handle
     * @param next  next interceptor in the chain, or the backend if no interceptors in the chain.
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }
}
