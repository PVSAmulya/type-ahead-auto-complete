import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoCompleteService } from './modules/auto-complete/auto-complete.service';
import { HttpService } from './http/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpAuthInterceptor } from './interceptors/http-auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthInterceptor,
    multi: true
  }, AutoCompleteService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
