import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        MatIconModule, 
        HttpClientModule
    ],
    providers: [
        provideHttpClient(withFetch()),
        /*AuthService*/
    ]
})
export class AuthModule { }
