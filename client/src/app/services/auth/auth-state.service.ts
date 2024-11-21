import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
    private authenticated = new BehaviorSubject<boolean>(false);
    
    setAuthenticated(status: boolean) {
        this.authenticated.next(status);
    }

    isAuthenticated(): boolean {
        return this.authenticated.value;
    }
}