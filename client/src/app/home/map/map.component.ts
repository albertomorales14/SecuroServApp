import { Component, Inject, PLATFORM_ID, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { ModalComponent } from '../modal/modal.component';
import { MapService } from '../../services/map/map.service';
import { AuthService } from '../../services/auth/auth.service';
import { Almacen } from '../../models/almacen';
import { LAYER, MARKER, COORDENADAS } from '../../../assets/mapsUtils';
import { mapAnimation } from '../../../assets/animations';
import { environment } from '../../../environments/environment';
import * as L from 'leaflet';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [CommonModule, PopupComponent, ModalComponent],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css', encapsulation: ViewEncapsulation.None,
    animations: [mapAnimation]
})
export class MapComponent {

    // Mostrar / Ocultar layout Resumen
    @Output() layoutToggled = new EventEmitter<boolean>(); // Evento para emitir el cambio de visibilidad
    isLayoutVisible: boolean = true;
    mapHeight: string = '100vh';

    // Botonera filtro superior
    activeButtonIndex: number = 0;
    // Botones de Relieve
    activeRelieveIndex: number = 0;

    // interacciones con Mapa
    interactionsEnabled: boolean = false;
    // Mapa
    private map!: L.Map
    mapOptions: any;
    markers: { marker: L.Marker, almacen: Almacen }[] = [];
    // Almacenes
    listaAlmacenes: Almacen[] = [];

    // PopUp
    showPopupLayout: boolean | undefined = false;
    popupContent: any;

    // Modal
    isModalOpen = false;

    // Layers
    hillShadeLayer: any;
    darkLayer: any;
    openStreetMapHot: any;

    defaultLayerImg: string = '';
    hillShadeImg: string = '';
    darkLayerImg: string = '';

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mapService: MapService,
        private authService: AuthService
    ) {
        this.defaultLayerImg = `${environment.CLOUDINARY_API_URL}/ORIGINAL_LAYER_wjvlth.png`;
        this.hillShadeImg = `${environment.CLOUDINARY_API_URL}/HILL_SHADE_LAYER_oalgvx.png`;
        this.darkLayerImg = `${environment.CLOUDINARY_API_URL}/DARK_LAYER_xvw2db.png`;
    }

    ngAfterViewInit(): void {
        // Angular DOM ready:
        this.popupContent = document.querySelectorAll('.popupTemplate');
    }

    async ngOnInit(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            // Inicializacion del mapa
            const L = await import('leaflet');

            this.darkLayer = L.tileLayer(LAYER.DARK_LAYER, {
                opacity: 0.6,
                maxZoom: 18,
                minZoom: 14
            });

            this.hillShadeLayer = L.tileLayer(LAYER.HILL_SHADE_LAYER, {
                opacity: 0.4,
                maxZoom: 18,
                minZoom: 14
            });

            this.openStreetMapHot = L.tileLayer(LAYER.OPEN_STREET_MAP_HOT, {
                opacity: 0.4,
                maxZoom: 18,
                minZoom: 14
            });

            this.map = L.map('map', {
                center: [36.13326, -5.45051],
                zoom: 16,
                layers: [
                    this.darkLayer, 
                    this.hillShadeLayer
                ],
                dragging: this.interactionsEnabled,
                scrollWheelZoom: this.interactionsEnabled,
                doubleClickZoom: this.interactionsEnabled,
                boxZoom: this.interactionsEnabled,
                keyboard: this.interactionsEnabled,
                zoomControl: this.interactionsEnabled,
            });

            L.control.zoom({
                position: 'topright'
            }).addTo(this.map);

            this.setBounds(L);
            this.addMarkers(L);
            //this.addGrid(L, 1);

            // pintar coordenadas en consola
            this.map.on('click', (e: L.LeafletMouseEvent) => {
                this.showPopupLayout = false;
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
            COORDENADAS.SOUTHWEST, // Esquina suroeste (límite inferior)
            COORDENADAS.NORTHEAST  // Esquina noreste (límite superior)
        );
        this.map.setMaxBounds(bounds);
        this.map.on('drag', () => {
            this.map?.panInsideBounds(bounds, { animate: true });
        });
    }

    private addGrid(L: any, interval: number): void {
        if (isPlatformBrowser(this.platformId)) {
            const bounds = this.map.getBounds();
            const startLat = Math.floor(bounds.getSouthWest().lat / interval) * interval;
            const endLat = Math.ceil(bounds.getNorthEast().lat / interval) * interval;
            const startLng = Math.floor(bounds.getSouthWest().lng / interval) * interval;
            const endLng = Math.ceil(bounds.getNorthEast().lng / interval) * interval;
        
            // Crear líneas de latitud
            for (let lat = startLat; lat <= endLat; lat += interval) {
                L.polyline([[lat, startLng], [lat, endLng]], { color: 'white', weight: 0.5 }).addTo(this.map);
            }
            // Crear líneas de longitud
            for (let lng = startLng; lng <= endLng; lng += interval) {
                L.polyline([[startLat, lng], [endLat, lng]], { color: 'white', weight: 0.5 }).addTo(this.map);
            }
        }
    }

    // Añade los marcadores de los almacenes
    private addMarkers(L: any): void {
        if (isPlatformBrowser(this.platformId)) {

            const redIcon = L.icon(MARKER.RED);
            const redActiveIcon = L.icon(MARKER.RED_ACTIVE);
            const greenIcon = L.icon(MARKER.GREEN);
            const greenActiveIcon = L.icon(MARKER.GREEN_ACTIVE);
            const homeIcon = L.icon(MARKER.HOME);

            this.mapService.getWareHousesByUserId(this.authService.getUser()).subscribe({
                next: (data) => {
                    // Establece el valor de la lista global con todos los almacenes
                    this.listaAlmacenes = data;
                    console.log('lista de almacenes obtenida: ');
                },
                error: (error) => {
                    console.error('Error al obtener almacenes:', error);
                },
                complete: () => {
                    if (this.map) {
                        const homeMarker = L.marker(COORDENADAS.HOME, { icon: homeIcon }).addTo(this.map);
                        this.markers.push({ marker: homeMarker, almacen: this.mapService.getEmptyWareHouse() });

                        this.listaAlmacenes.forEach(almacen => {
                            const marker = L.marker(
                                [almacen.lat, almacen.long], {
                                icon: almacen.comprado ? greenIcon : redIcon
                            }
                            ).addTo(this.map);

                            this.popupContent.forEach((popupContent: any) => {
                                marker.bindPopup(popupContent);
                            });

                            marker.on('click', () => {
                                this.mapService.setMarkerData(almacen);
                                this.showPopupLayout = true;
                                marker.setIcon(almacen.comprado ? greenActiveIcon : redActiveIcon)
                                marker.on('mouseout', () => {
                                    marker.setIcon(almacen.comprado ? greenIcon : redIcon)
                                });
                            });

                            marker.on('mouseover', () => {
                                marker.setIcon(almacen.comprado ? greenActiveIcon : redActiveIcon)
                                marker.on('mouseout', () => {
                                    if (!this.showPopupLayout) {
                                        marker.setIcon(almacen.comprado ? greenIcon : redIcon)
                                    }
                                });
                            });

                            this.markers.push({ marker, almacen });
                        });

                        this.hideMarkers();
                    }
                 }
            });
        }
    }

    // Habilitar interaccion con el mapa
    enableInteractions(): void {
        this.mapHeight = '100vh';
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (this.map) {
            // Mostrar Markers
            this.showMarkers();
            this.showPopupLayout = false;
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
            // Ocultar zoom bar
            const zoomBar = document.querySelectorAll('.leaflet-bar');
            zoomBar.forEach(zoomBar => {
                const htmlElement = zoomBar as HTMLElement;
                htmlElement.style.display = 'none';
            });
        }
    }

    // Deshabilitar interaccion con el mapa
    disableInteractions(): void {
        if (this.map) {
            // Ocultar markers
            this.hideMarkers();
            this.showPopupLayout = false;
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

    // Ocultar los markers
    hideMarkers(): void {
        this.markers.forEach(marker => {
            // Hace los markers invisibles
            marker.marker.setOpacity(0);
            marker.marker.closePopup();
        });
    }

    // Mostrar TODOS los markers
    showMarkers(): void {
        // Hace los markers visibles
        this.setActiveButton(0);
        this.markers.forEach(marker => marker.marker.setOpacity(1));
    }

    // Método para mostrar los markers EN PROPIEDAD
    showMarkersPropiedad(): void {
        this.hideMarkers();
        this.markers.forEach(({ marker, almacen }) => {
            // Opacidad reducida para los que no cumplen el filtro
            marker.setOpacity(almacen.comprado ? 1 : 0);
        });
    }

    // Filtro por tamaño de Almacen
    showOnSizeWareHouses(size: string): void {
        this.hideMarkers();
        this.markers.forEach(({ marker, almacen }) => {
            // Opacidad reducida para los que no cumplen el filtro
            marker.setOpacity((almacen.size === 'Home' || almacen.size === size) ? 1 : 0);
        });
    }

    // Botonera superior (filtro)
    setActiveButton(index: number): void {
        this.activeButtonIndex = index;  // Cambiar el índice activo
    }

    // Capas de Relieve
    setActiveLayer(index: number): void {
        this.activeRelieveIndex = index;
    }

    // Capa Hill Shade
    setHillShadeLayer() {
        this.darkLayer.setOpacity(0);
        this.hillShadeLayer.setOpacity(1);
    }

    // Capa Oscura Minimalista
    setDarkLayer() {
        this.darkLayer.setOpacity(1);
        this.hillShadeLayer.setOpacity(0);
    }

    // Capa por defecto
    restoreMapLayers() {
        this.darkLayer.setOpacity(0.6);
        this.hillShadeLayer.setOpacity(0.4);
    }

    // Método que el padre puede llamar para pulsar el botón hijo
    triggerButtonClick() {
        const warehousesbutton = document.querySelectorAll('.warehousesbutton');
        warehousesbutton.forEach(warehousesbutton => {
            const btn = warehousesbutton as HTMLButtonElement;
            btn.click();
        });
    }

    // [+] Button
    onZoomIn() {
        const zoomInButton = document.querySelectorAll('.leaflet-control-zoom-in');
        zoomInButton.forEach(zoomInButton => {
            const btn = zoomInButton as HTMLButtonElement;
            btn.click();
        });
    }

    // [-] Button
    onZoomOut() {
        const zoomOutButton = document.querySelectorAll('.leaflet-control-zoom-out');
        zoomOutButton.forEach(zoomOutButton => {
            const btn = zoomOutButton as HTMLButtonElement;
            btn.click();
        });
    }
}
