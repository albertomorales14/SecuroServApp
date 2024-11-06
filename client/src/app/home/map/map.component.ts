import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ViewChildren, ElementRef, Renderer2, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { LAYER, MARKER, COORDENADAS } from '../../../assets/mapsUtils';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css', encapsulation: ViewEncapsulation.None
})
export class MapComponent {

    @Output() layoutToggled = new EventEmitter<boolean>(); // Evento para emitir el cambio de visibilidad
    isLayoutVisible: boolean = true;
    @ViewChildren('leaflet-bar') div!: QueryList<ElementRef> | undefined;
    // interacciones con Mapa
    interactionsEnabled: boolean = false;
    // Mapa
    private map!: L.Map
    mapOptions: any;
    markers: L.Marker[] = [];

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

    async ngOnInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {

            const L = await import('leaflet');
            this.map = await L.map('map', {
                center: [36.13326, -5.45051],
                zoom: 16,
                //zoomControl: false,
                layers: [
                    L.tileLayer(LAYER.DARK_LAYER, {
                        //maxZoom: 18,
                        //minZoom: 15
                    })
                ],
                dragging: this.interactionsEnabled,
                scrollWheelZoom: this.interactionsEnabled,
                doubleClickZoom: this.interactionsEnabled,
                boxZoom: this.interactionsEnabled,
                keyboard: this.interactionsEnabled,
                zoomControl: this.interactionsEnabled,
            });

            await L.control.zoom({
                position: 'topright'
            }).addTo(this.map);

            this.setBounds(L);
            this.addMarkers(L);

            this.map.on('click', (e: L.LeafletMouseEvent) => {
                this.printCoordinates(e.latlng); // Llamar a la función que imprime las coordenadas
              });
        }
    }

    printCoordinates(latlng: L.LatLng) {
        console.log(`Latitud: ${latlng.lat}, Longitud: ${latlng.lng}`);
      }

    // Establece los límites de desplazamiento máximo
    private setBounds(L: any) {
        const bounds = L.latLngBounds(
            [36.05, -5.5], // Esquina suroeste (límite inferior)
            [36.21, -5.3]   // Esquina noreste (límite superior)
        );
        this.map.setMaxBounds(bounds);
        this.map.on('drag', () => {
            this.map?.panInsideBounds(bounds, { animate: true });
        });
    }

    // Añade los marcadores de los almacenes
    private addMarkers(L: any): void {
        if (isPlatformBrowser(this.platformId)) {
            const redMarker = L.icon(MARKER.RED);
            const greenMarker = L.icon(MARKER.GREEN);

            if (this.map) {
                const marker = L.marker(COORDENADAS.ALMACEN1, { icon: redMarker }).addTo(this.map);
                marker.bindPopup('<b>¡Hola!</b><br>Este es un marcador en Leaflet.')
                this.markers.push(marker);

                const marker2 = L.marker(COORDENADAS.ALMACEN2, { icon: greenMarker }).addTo(this.map);
                marker2.bindPopup('<b>¡Hola!</b><br>Este es un marcador en Leaflet.')
                this.markers.push(marker2);

                this.hideMarkers();

            }
        }

    }

    enableInteractions(): void {
        if (this.map) {
            // Mostrar Markers
            this.showMarkers();
            // Activar interaccion con mapa
            this.interactionsEnabled = true;
            this.map.dragging.enable();
            this.map.scrollWheelZoom.enable();
            this.map.doubleClickZoom.enable();
            this.map.boxZoom.enable();
            this.map.keyboard.enable();
            // Ocultar Layout Resumen
            this.isLayoutVisible = false;
            this.layoutToggled.emit(this.isLayoutVisible);
            // Mostrar zoom bar
            const zoomBar = document.querySelectorAll('.leaflet-bar');
            zoomBar.forEach(zoomBar => {
                const htmlElement = zoomBar as HTMLElement;
                htmlElement.style.display = 'flex';
            });
        }
    }

    disableInteractions(): void {
        if (this.map) {
            // Ocultar markers
            this.hideMarkers();
            // Desactivar interaccion con mapa
            this.interactionsEnabled = false;
            this.map.dragging.disable();
            this.map.scrollWheelZoom.disable();
            this.map.doubleClickZoom.disable();
            this.map.boxZoom.disable();
            this.map.keyboard.disable();
            // Mostrar Layout Resumen
            this.isLayoutVisible = true;
            this.layoutToggled.emit(this.isLayoutVisible);
            // Ocultar zoom bar
            const zoomBar = document.querySelectorAll('.leaflet-bar');
            zoomBar.forEach(zoomBar => {
                const htmlElement = zoomBar as HTMLElement;
                htmlElement.style.display = 'none';
            });
        }
    }

    // Método para ocultar los markers
  hideMarkers(): void {
    this.markers.forEach(marker => marker.setOpacity(0)); // Hace los markers invisibles
  }

  // Método para mostrar los markers
  showMarkers(): void {
    this.markers.forEach(marker => marker.setOpacity(1)); // Hace los markers visibles
  }

}
