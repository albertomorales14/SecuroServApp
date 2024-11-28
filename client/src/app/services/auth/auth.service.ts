import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { JwtResponse } from '../../models/jwt-response';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { jwtDecode } from 'jwt-decode';
import { VALIDATIONS } from '../../../assets/validationsUtils';
import { LogService } from '../log/log.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    authSubject = new BehaviorSubject(false);
    private token: string = '';
    private err_msg: any;
    private success_msg: any;

    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();
    private user!: User;

    // set user after register
    private tempUsername: string = '';
    private tempPassword: string = '';

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private authState: AuthStateService,
        private logger: LogService
    ) { }

    register(user: User): Observable<JwtResponse> {
        return this.httpClient.post<JwtResponse>(`${environment.API_URL}/register`, user).pipe(
            tap((response: JwtResponse) => {
                if (response?.message) {
                    this.err_msg = response;
                    this.logger.logError('\t> Cliente: Error en la respuesta: ' + response?.message + ' (auth.service.ts)');
                } else {
                    this.success_msg = VALIDATIONS.SUCCESS_MESSAGE;
                    this.logger.logInfo('\t> Cliente: Success en register method (auth.service.ts)');
                    this.authSubject.next(true);
                }
            }),
            catchError(error => {
                this.logger.logError('\t> Cliente: Error en register method: ' + error + ' (auth.service.ts)');
                return throwError(() => error);
            })
        );
    }

    login(user: User): Observable<JwtResponse> {
        return this.httpClient.post<JwtResponse>(`${environment.API_URL}/login`, user, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).pipe(tap((response: JwtResponse) => {
            if (response && response.dataUser) {
                if (response.dataUser.accessToken) {
                    this.currentUserSubject.next(user);
                    this.user = user;
                    this.authState.setAuthenticated(true);
                    this.saveToken(response.dataUser.accessToken, response.dataUser.expiresIn);
                    this.logger.logInfo('\t> Cliente: Login correcto, Token establecido (auth.service.ts)');
                } else {
                    this.logger.logError('\t> Cliente: No se recibió token en la respuesta. (auth.service.ts)');
                }
            } else {
                this.err_msg = response;
                this.logger.logError('\t> Cliente: No se recibió ningún usuario en la respuesta. (auth.service.ts)');
                this.logger.logError('\t> Cliente: Mensaje de error obtenido: ' + response?.message + ' (auth.service.ts)');
            }
        }), catchError(error => {
            this.logger.logError('\t> Cliente: Error en la solicitud: ' + error + ' (auth.service.ts)');
            if (error.error instanceof ProgressEvent) {
                this.logger.logError('\t> Cliente: Posible problema de red o configuración de CORS (auth.service.ts)');
            } else {
                this.logger.logError('\t> Cliente: Contenido inesperado en la respuesta: ' + error.error + ' (auth.service.ts)');
            }
            return throwError(() => error);
        }))
    }

    logout(): void {
        this.authState.setAuthenticated(false);
        this.token = '';
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('EXPIRES_IN');
        this.authSubject.next(false); // Notifica que el usuario ha cerrado sesión
        this.logger.logInfo('\t> Cliente: Sesión cerrada, token eliminado (auth.service.ts)');
        this.router.navigate(['/auth/login']);
    }

    getUser(): User {
        console.log('get user: ' + this?.user.id)
        return this?.user;
    }

    // token
    private saveToken(token: string, expiresIn: string): void {
        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('EXPIRES_IN', expiresIn);
        this.token = token;
    }

    private getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean {
        return this.authState.isAuthenticated();
    }

    // Credenciales temporales para establecer
    setTempCredentials(username: string, password: string) {
        this.tempUsername = username;
        this.tempPassword = password;
    }

    getTempCredentials() {
        return { username: this.tempUsername, password: this.tempPassword };
    }

    clearTempCredentials() {
        this.tempUsername = '';
        this.tempPassword = '';
    }

    /* Mensajes de success y error */
    getErrMsg(): any {
        return this.err_msg;
    }

    getSuccessMsg(): any {
        return this.success_msg;
    }

    clearSuccessMsg(): any {
        this.success_msg = '';
    }

    /*
    getCloudinaryImage(src: string): Observable<string> {
        const imageUrl = `${environment.CLOUDINARY_API_URL}/${src}`;

        return this.httpClient.head(imageUrl, { observe: 'response' }).pipe(
            map(response => {
                if (response.status === 200) {
                    // La imagen existe, retorna la URL de la imagen
                    return imageUrl;
                } else {
                    // Si no es 200, considera que la imagen no está disponible
                    throw new Error('Image not found');
                }
            }),
            catchError(() => {
                // En caso de error, retorna un observable con una URL de imagen por defecto
                return of('/img/securoserv-logo.png'); // Pon aquí tu imagen por defecto
            })
        );
    }
    */
}
