import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    username: string = '';
    password: string = '';
    
    constructor(private authService: AuthService, private router: Router) { }

    navigateToRegister() {
        this.router.navigate(['/auth/register']);
    }

    onLogin(loginForm: NgForm): void {
        if (loginForm.valid) {
            this.authService.login(loginForm.value).subscribe({
                next: (response) => {
                    console.log('next')
                },
                error: (error) => {
                    // Manejo de errores adicional aquí
                    console.log('error ' + error)
                }
            });
        } else {
            console.log('Formulario no válido');
        }
    }

    ngOnInit(): void {
        // Obtiene y asigna los datos de usuario y contraseña desde el servicio
        const { username, password } = this.authService.getTempCredentials();
        this.username = username;
        this.password = password;

        // Limpia los datos del servicio después de asignarlos
        this.authService.clearTempCredentials();
    }

}
