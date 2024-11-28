import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { VALIDATIONS } from '../../../assets/validationsUtils';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, MatIconModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

    securoservImg: string = '../../../assets/img/securoserv-logo.png';
    validations: any = VALIDATIONS;
    msgError: string = '';
    pswdType: string = 'password';
    isLoading: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.authService.clearSuccessMsg();
        this.isLoading = false;
    }

    navigateToLogin() {
        this.router.navigate(['/auth/login']);
    }

    onRegister(registerForm: NgForm): void {
        if (registerForm.valid) {
            this.isLoading = true;
            this.authService.register(registerForm.value).subscribe({
                next: () => {
                    this.msgError = this.authService.getErrMsg()?.message;

                    if (this.msgError === VALIDATIONS.USER_EXIST) {
                        registerForm.controls['username']?.setErrors({ exist: true });
                        this.isLoading = false;
                    } else {
                        
                        this.authService.setTempCredentials(registerForm.value.username, registerForm.value.password);
                        setTimeout(() => {
                            this.isLoading = false;
                            this.router.navigate(['/auth/login']);
                        }, 2000);
                    }

                    
                },
                error: (error) => {
                    // Manejo de errores adicional aquí
                },
                complete: () => {
                    console.log('complete')
                    
                }
            });
        } else {
            console.log('Formulario no válido');
            registerForm.controls['username']?.markAsTouched();
            registerForm.controls['password']?.markAsTouched();
        }
    }

    // Ver contraseña
    tooglePasswordVisibility() {
        this.pswdType = this.pswdType === 'text' ? 'password' : 'text';
    }

}
