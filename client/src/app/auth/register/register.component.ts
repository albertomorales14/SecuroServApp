import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, MatIconModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

    constructor(private authService: AuthService, private router: Router) { }

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }

    onRegister(registerForm: NgForm): void {
        if (registerForm.valid) {
            this.authService.register(registerForm.value).subscribe({
                next: (response) => {
                    this.authService.setTempCredentials(registerForm.value.username, registerForm.value.password);
                    this.router.navigate(['/auth/login']);
                },
                error: (error) => {
                    // Manejo de errores adicional aquí
                }
            });
        } else {
            console.log('Formulario no válido');
        }
    }

}
