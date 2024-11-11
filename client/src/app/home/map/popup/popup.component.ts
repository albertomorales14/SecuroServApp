import { Component, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../services/map.service';
import { CompradoComponent } from './comprado/comprado.component';
import { NoCompradoComponent } from './no-comprado/no-comprado.component';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-popup',
    standalone: true,
    imports: [CommonModule, CompradoComponent, NoCompradoComponent],
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.css', encapsulation: ViewEncapsulation.None
})
export class PopupComponent {

    @Input() markerData: any;
    imageSrc: string = '';

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.mapService.markerData$.subscribe(data => {
            this.markerData = data;
            this.updateImageSrc();
        });
    }

    updateImageSrc() {
        // Actualiza la ruta de la imagen cada vez que cambia el markerData
        if (this.markerData && this.markerData.image) {
          this.imageSrc = `${environment.CLOUDINARY_API_URL}/${this.markerData.image}`;
        }
      }

}