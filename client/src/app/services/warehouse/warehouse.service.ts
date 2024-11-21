import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Almacen } from '../../models/almacen';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WarehouseService {

    private apiUrl = `${environment.API_URL}/API/warehouses`;

    constructor(private httpClient: HttpClient) { }

    // Actualizar Almacen
    updateWareHouse(id: string, updatedData: Partial<Almacen>): Observable<Almacen> {
        return this.httpClient.put<Almacen>(`${this.apiUrl}/${id}`, updatedData);
    }

}
