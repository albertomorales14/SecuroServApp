import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    private apiUrl = `${environment.API_URL}/api/logs`;

    constructor(private httpClient: HttpClient) { }

    logInfo(message: string, meta?: any): void {
        this.sendLog('info', message, meta);
    }

    logError(message: string, meta?: any): void {
        this.sendLog('error', message, meta);
    }

    logWarn(message: string, meta?: any): void {
        this.sendLog('warn', message, meta);
    }

    private sendLog(level: string, message: string, meta?: any): void {
        const log = { level, message, meta, timestamp: new Date().toISOString() };

        // Enviar al backend
        this.httpClient.post(this.apiUrl, log, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        }).subscribe({
            next: () => { /* No es necesaria ninguna acción */ },
            error: () => { /* No es necesaria ninguna acción */ }
        });
    }
}
