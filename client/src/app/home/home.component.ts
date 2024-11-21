import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, Renderer2, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { MapComponent } from './map/map.component';
import { homeComponentAnimation } from '../../assets/animations';
import { Resumen1Component } from './resumen/resumen1/resumen1.component';
import { Resumen2Component } from './resumen/resumen2/resumen2.component';
import { Resumen5Component } from './resumen/resumen5/resumen5.component';
import { DonutChartComponent } from './resumen/donut-chart/donut-chart.component';
import { BarChartComponent } from './resumen/bar-chart/bar-chart.component';
import { ModalComponent } from './modal/modal.component';
import { EventEmitter, Output } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        Resumen1Component,
        Resumen2Component,
        DonutChartComponent,
        BarChartComponent,
        Resumen5Component,
        MapComponent,
        ModalComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    animations: [homeComponentAnimation]
})
export class HomeComponent implements OnInit {

    username: string | null = null;
    isLayoutVisible: boolean = true;
    @ViewChild(MapComponent) childComponent!: MapComponent;

    constructor(
        private authService: AuthService,
        public modalService: ModalService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    // Mostrar / Ocultar Layout Resumen
    onLayoutToggled(isVisible: boolean) {
        this.isLayoutVisible = isVisible; // Actualizar el valor del layout
    }

    handleClickWareHousesButton() {
        if (this.childComponent) {
            this.childComponent.triggerButtonClick(); // Llama al método solo si `childComponent` está disponible
          }
    }

    async ngOnInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {

            this.authService.currentUser.subscribe({
                next: (user) => {
                    if (user) {
                        this.username = user?.username;
                        console.log('Data received:', user);
                    }
                },
                error: (error) => console.error('Error al obtener el usuario:', error),
                complete: () => console.log('Observer completed')
            });
        }


    }


    /*ngAfterViewInit() {
        if(isPlatformBrowser(this.platformId)){
            this.initMap();
        this.centerMap();
          }
        
      }

      private initMap() {
        const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        this.map = L.map('map');
        L.tileLayer(baseMapURl).addTo(this.map);
      }
    
    
      private centerMap() {
        // Create a boundary based on the markers
        const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
        
        // Fit the map into the boundary
        this.map.fitBounds(bounds);
      }*/

    /*ngOnDestroy(): void {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe(); // Desuscribirse al componente
        }
    }*/

    onLogout() {
        this.authService.logout();
    }

}
