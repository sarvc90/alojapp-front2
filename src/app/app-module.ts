import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './core/interceptors/auth-token-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

  providers: [
    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
  ]


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
