import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { VALIDATIONS } from '../../../assets/validationsUtils';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    username: string = '';
    password: string = '';
    securoservImg: string = '../../../assets/img/securoserv-logo.png';
    validations: any = VALIDATIONS;
    msgError: string = '';
    pswdType: string = 'password';
    successMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        // Obtiene y asigna los datos de usuario y contraseña desde el servicio
        const { username, password } = this.authService.getTempCredentials();
        if (this.authService.getSuccessMsg()) {
            this.successMessage = this.authService.getSuccessMsg();
        }
        this.username = username;
        this.password = password;
        // TRAMPEO LOGIN
        //this.username = 'Cutiti007';
        //this.password = '123';

        // Limpia los datos del servicio después de asignarlos
        this.authService.clearTempCredentials();
    }

    navigateToRegister() {
        this.successMessage = '';
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
                    console.log('error ' + error)
                },
                complete: () => {
                    // limpiar mensaje de exito
                    this.authService.clearSuccessMsg();
                    
                    this.msgError = this.authService.getErrMsg()?.message;
                    console.log(this.msgError)
                    if (this.msgError === VALIDATIONS.PASSWORD_INCORRECT) {
                        loginForm.controls['password']?.setErrors({ incorrect: true });
                    }
                    if (this.msgError === VALIDATIONS.USER_NON_EXIST) {
                        loginForm.controls['username']?.setErrors({ incorrect: true });
                    }
                }
            });
        } else {
            console.log('Formulario no válido');
        }
    }

    // Ver contraseña
    tooglePasswordVisibility() {
        this.pswdType = this.pswdType === 'text' ? 'password' : 'text';
    }

}
