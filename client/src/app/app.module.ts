import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule  } from '@angular/common/http';
import { HttpClient  } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgLeafletModule } from '@mugan86/ng-leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapService } from './services/map.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonModule,
        HttpClientModule, 
        HttpClient,
        AuthModule,
        NgLeafletModule, LeafletModule
    ],
    providers: [AuthService, MapService],
    bootstrap: [AppComponent]
})
export class AppModule { }