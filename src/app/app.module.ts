import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeComponentsModule } from './shared/prime-components/prime-components.module';
import { SharedModule } from 'primeng/api';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { LoginComponent } from '@shared/components/login/login.component';
import { HeaderInterceptor } from '@core/interceptors/header.interceptor';




@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        PrimeComponentsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        AppRoutingModule,
    ],
    
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HeaderInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
