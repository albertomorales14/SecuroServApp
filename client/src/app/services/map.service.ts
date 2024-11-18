import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Almacen } from '../models/almacen';
import { User } from '../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    private markerDataSource = new BehaviorSubject<any>(null);
    markerData$ = this.markerDataSource.asObservable();

    // Numero de almacenes en propiedad del usuario
    numAlmacenesPropiedad: number = 0;

    constructor(private httpClient: HttpClient) {}

    setMarkerData(markerData: any) {
        this.markerDataSource.next(markerData);
    }

    getMarkerData() {
        return this.markerDataSource;
    }

    getEmptyWareHouse(): Almacen {
        return {
            id: 0,
            name: '',
            image: '',
            lat: 0,
            long: 0,
            ubicacion: '',
            size: 'Home',
            tipo: '',
            capacidadMax: 0,
            existencias: 0,
            valor: 0,
            comprado: true,
            userId: ''
        }
    }

    // Obtener Todos los Almacenes disponibles para el usuario
    getWareHousesByUserId(user: User): Observable<Almacen[]> {
        //return this.httpClient.get<Almacen[]>(`${environment.url}/API/warehouses/User/${user.id}`);
        return this.httpClient.get<Almacen[]>(`${environment.API_URL}/API/warehouses/User/67228f695119f85127ebef60`);
    }

    getNumAlmacenes(): number {
        return this.numAlmacenesPropiedad;
    }

    setNumAlmacenes(num: number): void {
        this.numAlmacenesPropiedad = num;
    }
}
