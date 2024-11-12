import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { JwtResponse } from '../models/jwt-response';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
    authSubject = new BehaviorSubject(false);
    private token: string = '';

    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();
    private user!: User;

    // set user after register
    private tempUsername: string = '';
    private tempPassword: string = '';

    constructor(private httpClient: HttpClient, private router: Router, private authState: AuthStateService) { }

    register(user: User): Observable<JwtResponse> {
        return this.httpClient.post<JwtResponse>(`${environment.API_URL}/register`, user).pipe(
            tap((response: JwtResponse) => {
                if (response) {
                    this.authSubject.next(true);
                }
            }),
            catchError(error => {
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
                    jwtDecode<JwtResponse>(response.dataUser.accessToken);

                    if (jwtDecode<JwtResponse>(response.dataUser.accessToken).dataUser?.id) {
                        
                    }

                    console.log('decode  ' + jwtDecode<JwtResponse>(response.dataUser.accessToken).dataUser);
                     
                    this.user = user;

                    this.authState.setAuthenticated(true);
                    this.saveToken(response.dataUser.accessToken, response.dataUser.expiresIn);
                    
                } else {
                    console.warn('No se recibió un accessToken en la respuesta.');
                }
            } else {
                console.warn('No se recibió dataUser en la respuesta.');
            }
        }), catchError(error => {
            console.error('Error en la solicitud:', error); // Esto muestra el error completo
            if (error.error instanceof ProgressEvent) {
                console.error('Posible problema de red o configuración de CORS');
            } else {
                console.error('Contenido inesperado en la respuesta:', error.error);
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

    // set user into form after register
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
}
