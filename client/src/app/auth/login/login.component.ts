import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

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
    securoservImg: string = 'img/securoserv-logo.png';

    constructor(private authService: AuthService, private router: Router) {
        /*this.authService.getCloudinaryImage('securoserv-logo_kjijgb.png').subscribe(url => {
            this.securoservImg = url;
        });*/
        //this.securoservImg = `${environment.CLOUDINARY_API_URL}/securoserv-logo_kjijgb.png`;
    }

    navigateToRegister() {
        this.router.navigate(['/auth/register']);
    }

    onLogin(loginForm: NgForm): void {
        if (loginForm.valid) {
            this.authService.login(loginForm.value).subscribe({
                next: () => {
                    console.log('next')
                    this.router.navigate(['/home']);
                },
                error: (error) => {
                    // Manejo de errores adicional aquí
                    console.log('error ' + error)
                },
                complete: () => {
                    console.log('complete');
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
        // TRAMPEO LOGIN
        this.username = 'Cutiti007';
        this.password = '123';

        // Limpia los datos del servicio después de asignarlos
        this.authService.clearTempCredentials();
    }

}
