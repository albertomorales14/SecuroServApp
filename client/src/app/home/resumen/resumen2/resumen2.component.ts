import { Component } from '@angular/core';
import { homeComponentAnimation } from '../../../../assets/animations';
import { CHARTS_UTILS } from '../../../../assets/chartsUtils';

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
  total_ganancias_msg: string = CHARTS_UTILS.TOTAL_GANANCIAS;

  constructor() { }


}
