import { Component } from '@angular/core';
import { homeComponentAnimation } from '../../../../assets/animations';
import { CHARTS_UTILS } from '../../../../assets/chartsUtils';
import { MapService } from '../../../services/map.service';

@Component({
    selector: 'app-resumen2',
    standalone: true,
    imports: [],
    templateUrl: './resumen2.component.html',
    styleUrl: './resumen2.component.css',
    animations: [homeComponentAnimation]
})
export class Resumen2Component {

    almacenes_propiedad_msg: string = CHARTS_UTILS.ALMACENES_PROPIEDAD;
    almacenes_propiedad_value: number = 0;
    total_ganancias_msg: string = CHARTS_UTILS.TOTAL_GANANCIAS;

    constructor(private mapService: MapService) {
        this.almacenes_propiedad_value = this.mapService.getNumAlmacenes();
    }


}
