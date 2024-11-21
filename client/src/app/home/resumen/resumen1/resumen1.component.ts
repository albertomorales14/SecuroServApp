import { Component } from '@angular/core';
import { homeComponentAnimation } from '../../../../assets/animations';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-resumen1',
    standalone: true,
    imports: [],
    templateUrl: './resumen1.component.html',
    styleUrl: './resumen1.component.css',
    animations: [homeComponentAnimation]
})
export class Resumen1Component {

    username: string | null = null;

    constructor(private authService: AuthService) {
        this.username = this.authService.getUser()?.username;
    }

    onLogout() {
        this.authService.logout();
    }

}
